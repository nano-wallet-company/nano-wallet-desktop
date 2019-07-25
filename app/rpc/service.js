import Service, { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';
import { A } from '@ember/array';

import { defineError } from 'ember-exex/error';
import generateId from '../utils/generate-id';
import getTimestamp from '../utils/get-timestamp';

export const actions = {
  ACCOUNT_CREATE: 'account_create',
  ACCOUNT_HISTORY: 'account_history',
  ACCOUNT_INFO: 'account_info',
  ACCOUNT_LIST: 'account_list',
  ACCOUNT_REMOVE: 'account_remove',
  ACCOUNT_REPRESENTATIVE_SET: 'account_representative_set',
  ACCOUNT_REPRESENTATIVE: 'account_representative',
  ACCOUNTS_BALANCES: 'accounts_balances',
  BLOCK_CONFIRM: 'block_confirm',
  BLOCK_COUNT: 'block_count',
  BLOCK: 'block',
  BOOTSTRAP_LAZY: 'bootstrap_lazy',
  PASSWORD_CHANGE: 'password_change',
  PASSWORD_ENTER: 'password_enter',
  PASSWORD_VALID: 'password_valid',
  PEERS: 'peers',
  SEARCH_PENDING: 'search_pending',
  SEND: 'send',
  VERSION: 'version',
  WALLET_BALANCE_TOTAL: 'wallet_balance_total',
  WALLET_BALANCES: 'wallet_balances',
  WALLET_CHANGE_SEED: 'wallet_change_seed',
  WALLET_CREATE: 'wallet_create',
  WALLET_EXPORT: 'wallet_export',
  WALLET_FRONTIERS: 'wallet_frontiers',
  WALLET_LEDGER: 'wallet_ledger',
  WALLET_LOCK: 'wallet_lock',
  WALLET_LOCKED: 'wallet_locked',
  WALLET_PENDING: 'wallet_pending',
  WALLET_REPRESENTATIVE_SET: 'wallet_representative_set',
  WALLET_REPRESENTATIVE: 'wallet_representative',
  WALLET_SEED: 'wallet_seed',
};

export const errors = {
  WALLET_LOCKED: 'Wallet is locked',
  WALLET_NOT_FOUND: 'Wallet not found',
  ACCOUNT_NOT_FOUND: 'Account not found',
};

export const RPCError = defineError({
  name: 'RPCError',
  message: 'RPC error',
});

export const WalletLockedError = defineError({
  name: 'WalletLockedError',
  message: errors.WALLET_LOCKED,
  extends: RPCError,
});

export const WalletNotFoundError = defineError({
  name: 'WalletNotFoundError',
  message: errors.WALLET_NOT_FOUND,
  extends: RPCError,
});

export const AccountNotFoundError = defineError({
  name: 'AccountNotFoundError',
  message: errors.ACCOUNT_NOT_FOUND,
  extends: RPCError,
});

export const PasswordChangeError = defineError({
  name: 'PasswordChangeError',
  message: 'Password change failed',
  extends: RPCError,
});

export const InvalidPasswordError = defineError({
  name: 'InvalidPasswordError',
  message: 'Invalid password',
  extends: RPCError,
});

export const RepresentativeChangeError = defineError({
  name: 'RepresentativeChangeError',
  message: 'Could not change wallet representative: {representative}',
  extends: RPCError,
});

export default class RPCService extends Service {
  @service ajax;

  async call(action, params = {}) {
    const data = assign({ action }, params);
    const resp = await this.get('ajax').post('/', { data });
    if (typeof resp.error === 'string') {
      switch (resp.error) {
        case errors.WALLET_LOCKED:
          throw new WalletLockedError();
        case errors.WALLET_NOT_FOUND:
          throw new WalletNotFoundError();
        case errors.ACCOUNT_NOT_FOUND:
          throw new AccountNotFoundError();
        default:
          throw new RPCError(resp.error);
      }
    }

    return resp;
  }

  version() {
    return this.call(actions.VERSION);
  }

  walletCreate() {
    return this.call(actions.WALLET_CREATE);
  }

  async walletExport(wallet) {
    const { json } = await this.call(actions.WALLET_EXPORT, { wallet });
    return JSON.parse(json);
  }

  async walletLedger(wallet, representative = true, weight = true, pending = true) {
    const accounts = await this.call(actions.WALLET_LEDGER, {
      wallet,
      representative,
      weight,
      pending,
    });

    return accounts;
  }

  async walletLock(wallet) {
    const { locked } = await this.call(actions.WALLET_LOCK, { wallet });
    return locked === '1';
  }

  async walletLocked(wallet) {
    const { locked } = await this.call(actions.WALLET_LOCKED, { wallet });
    return locked === '1';
  }

  walletBalanceTotal(wallet) {
    return this.call(actions.WALLET_BALANCE_TOTAL, { wallet });
  }

  async walletFrontiers(wallet) {
    const { frontiers } = await this.call(actions.WALLET_FRONTIERS, { wallet });
    return frontiers;
  }

  async walletPending(wallet, count = 1, source = true, include_active = true) {
    const { blocks } = await this.call(actions.WALLET_PENDING, {
      wallet,
      count,
      source,
      include_active,
    });

    return blocks;
  }

  async walletBalances(wallet) {
    const { balances } = await this.call(actions.WALLET_BALANCES, { wallet });
    return balances;
  }

  async walletChangeSeed(wallet, seed) {
    const { success } = await this.call(actions.WALLET_CHANGE_SEED, { wallet, seed });
    return success === '';
  }

  async walletRepresentative(wallet) {
    const { representative } = await this.call(actions.WALLET_REPRESENTATIVE, { wallet });
    return representative;
  }

  async walletRepresentativeSet(wallet, representative, update_existing_accounts = true) {
    const { set } = await this.call(actions.WALLET_REPRESENTATIVE_SET, {
      wallet,
      representative,
      update_existing_accounts,
    });

    if (set !== '1') {
      throw new RepresentativeChangeError({ params: { representative } });
    }

    return true;
  }

  async walletSeed(wallet) {
    const { seed } = await this.call(actions.WALLET_SEED, { wallet });
    return seed;
  }

  accountCreate(wallet, work = true) {
    return this.call(actions.ACCOUNT_CREATE, { wallet, work });
  }

  async accountInfo(account, representative = true, pending = true) {
    let info = {};
    try {
      info = await this.call(actions.ACCOUNT_INFO, {
        account,
        representative,
        pending,
      });
    } catch (err) {
      if (!(err instanceof AccountNotFoundError)) {
        throw err;
      }

      // When an account has no transactions, the RPC replies with an
      // HTTP 200 OK and an error.
      info.account = account;
      info.balance = '0';
      if (pending) {
        info.pending = '0';
      }

      info.modified_timestamp = getTimestamp();
      info.block_count = 0;
      if (representative) {
        info.representative = account;
      }
    }

    return info;
  }

  async accountList(wallet) {
    const { accounts } = await this.call(actions.ACCOUNT_LIST, { wallet });
    return accounts;
  }

  async accountHistory(account, count = 1) {
    const { history } = await this.call(actions.ACCOUNT_HISTORY, {
      account,
      count,
    });

    return A(history);
  }

  accountRepresentative(account) {
    return this.call(actions.ACCOUNT_REPRESENTATIVE, { account });
  }

  accountRepresentativeSet(wallet, account, representative) {
    return this.call(actions.ACCOUNT_REPRESENTATIVE_SET, {
      wallet,
      account,
      representative,
    });
  }

  async accountRemove(wallet, account) {
    const { removed } = await this.call(actions.ACCOUNT_REMOVE, { wallet, account });
    return removed === '1';
  }

  async accountsBalances(accounts) {
    const { balances } = await this.call(actions.ACCOUNTS_BALANCES, { accounts });
    return balances;
  }

  send(wallet, source, destination, amount, id = generateId()) {
    return this.call(actions.SEND, {
      wallet,
      source,
      destination,
      amount,
      id,
    });
  }

  async peers() {
    // When there are no peers, the RPC replies with an empty string.
    const { peers } = await this.call(actions.PEERS);
    return peers || {};
  }

  async block(hash) {
    const { contents } = await this.call(actions.BLOCK, { hash });
    return JSON.parse(contents);
  }

  async blockCount() {
    const { count = 0, unchecked = 0 } = await this.call(actions.BLOCK_COUNT);

    return {
      count: parseInt(count, 10),
      unchecked: parseInt(unchecked, 10),
    };
  }

  blockConfirm(hash) {
    return this.call(actions.BLOCK_CONFIRM, { hash });
  }

  searchPending(wallet) {
    return this.call(actions.SEARCH_PENDING, { wallet });
  }

  async passwordChange(wallet, password) {
    const { changed } = await this.call(actions.PASSWORD_CHANGE, { wallet, password });
    if (changed !== '1') {
      throw new PasswordChangeError();
    }

    return true;
  }

  async passwordEnter(wallet, password) {
    const { valid } = await this.call(actions.PASSWORD_ENTER, { wallet, password });
    if (valid !== '1') {
      throw new InvalidPasswordError();
    }

    return true;
  }

  async passwordValid(wallet, password) {
    const { valid } = await this.call(actions.PASSWORD_VALID, { wallet, password });
    if (valid !== '1') {
      throw new InvalidPasswordError();
    }

    return true;
  }

  async bootstrapLazy(hash) {
    const { started } = await this.call(actions.BOOTSTRAP_LAZY, { hash });
    return started === '1';
  }
}
