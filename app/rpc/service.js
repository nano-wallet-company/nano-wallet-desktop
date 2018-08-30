import Service from '@ember/service';
import { assign } from '@ember/polyfills';
import { A } from '@ember/array';

import { service } from '@ember-decorators/service';

import { defineError } from 'ember-exex/error';
import generateId from '../utils/generate-id';
import getTimestamp from '../utils/get-timestamp';

export const actions = {
  VERSION: 'version',
  WALLET_CREATE: 'wallet_create',
  WALLET_LOCK: 'wallet_lock',
  WALLET_LOCKED: 'wallet_locked',
  WALLET_BALANCES: 'wallet_balances',
  WALLET_BALANCE_TOTAL: 'wallet_balance_total',
  WALLET_CHANGE_SEED: 'wallet_change_seed',
  WALLET_REPRESENTATIVE: 'wallet_representative',
  WALLET_REPRESENTATIVE_SET: 'wallet_representative_set',
  ACCOUNT_CREATE: 'account_create',
  ACCOUNT_INFO: 'account_info',
  ACCOUNT_LIST: 'account_list',
  ACCOUNT_HISTORY: 'account_history',
  ACCOUNT_REPRESENTATIVE: 'account_representative',
  ACCOUNT_REPRESENTATIVE_SET: 'account_representative_set',
  ACCOUNT_REMOVE: 'account_remove',
  SEND: 'send',
  PEERS: 'peers',
  BLOCK_COUNT: 'block_count',
  BLOCK_CONFIRM: 'block_confirm',
  SEARCH_PENDING: 'search_pending',
  PASSWORD_CHANGE: 'password_change',
  PASSWORD_ENTER: 'password_enter',
  PASSWORD_VALID: 'password_valid',
};

export const errors = {
  WALLET_NOT_FOUND: 'Wallet not found',
  ACCOUNT_NOT_FOUND: 'Account not found',
};

export const RPCError = defineError({
  name: 'RPCError',
  message: 'RPC error',
});

export const WalletNotFound = defineError({
  name: 'WalletNotFound',
  message: errors.WALLET_NOT_FOUND,
  extends: RPCError,
});

export const AccountNotFound = defineError({
  name: 'AccountNotFound',
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
  @service ajax = null;

  async call(action, params = {}) {
    const data = assign({ action }, params);
    const resp = await this.get('ajax').post('/', { data });
    if (typeof resp.error === 'string') {
      switch (resp.error) {
        case errors.WALLET_NOT_FOUND:
          throw new WalletNotFound();
        case errors.ACCOUNT_NOT_FOUND:
          throw new AccountNotFound();
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

  async walletRepresentativeSet(wallet, representative) {
    const { set } = await this.call(actions.WALLET_REPRESENTATIVE_SET, { wallet, representative });
    if (set !== '1') {
      throw new RepresentativeChangeError({ params: { representative } });
    }

    return true;
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
      if (!(err instanceof AccountNotFound)) {
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

  async blockCount() {
    const {
      count = 0,
      unchecked = 0,
    } = await this.call(actions.BLOCK_COUNT);

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
}
