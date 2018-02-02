import Service from '@ember/service';
import { assign } from '@ember/polyfills';
import { A } from '@ember/array';

import { service } from 'ember-decorators/service';

import { defineError } from 'ember-exex/error';

export const actions = {
  VERSION: 'version',
  WALLET_CREATE: 'wallet_create',
  WALLET_LOCKED: 'wallet_locked',
  WALLET_BALANCE_TOTAL: 'wallet_balance_total',
  WALLET_CHANGE_SEED: 'wallet_change_seed',
  ACCOUNT_CREATE: 'account_create',
  ACCOUNT_INFO: 'account_info',
  ACCOUNT_LIST: 'account_list',
  ACCOUNT_HISTORY: 'account_history',
  ACCOUNT_REMOVE: 'account_remove',
  SEND: 'send',
  PEERS: 'peers',
  BLOCK_COUNT: 'block_count',
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

export default Service.extend({
  @service ajax: null,

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
  },

  version() {
    return this.call(actions.VERSION);
  },

  walletCreate() {
    return this.call(actions.WALLET_CREATE);
  },

  async walletLocked(wallet) {
    const { locked } = await this.call(actions.WALLET_LOCKED, { wallet });
    return locked === '1';
  },

  walletBalanceTotal(wallet) {
    return this.call(actions.WALLET_BALANCE_TOTAL, { wallet });
  },

  async walletChangeSeed(wallet, seed) {
    const { success } = await this.call(actions.WALLET_CHANGE_SEED, { wallet, seed });
    return success === '';
  },

  accountCreate(wallet) {
    return this.call(actions.ACCOUNT_CREATE, { wallet });
  },

  async accountInfo(account, pending = true) {
    let info = {};
    try {
      info = await this.call(actions.ACCOUNT_INFO, {
        account,
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
    }

    return info;
  },

  accountList(wallet) {
    return this.call(actions.ACCOUNT_LIST, { wallet });
  },

  async accountHistory(account, count = 1) {
    const { history } = await this.call(actions.ACCOUNT_HISTORY, {
      account,
      count,
    });

    return A(history);
  },

  accountRemove(wallet, account) {
    return this.call(actions.ACCOUNT_REMOVE, { wallet, account });
  },

  send(wallet, source, destination, amount) {
    return this.call(actions.SEND, {
      wallet,
      source,
      destination,
      amount,
    });
  },

  async peers() {
    // When there are no peers, the RPC replies with an empty string.
    const { peers } = await this.call(actions.PEERS);
    return peers || {};
  },

  blockCount() {
    return this.call(actions.BLOCK_COUNT);
  },

  async passwordChange(wallet, password) {
    const { changed } = await this.call(actions.PASSWORD_CHANGE, { wallet, password });
    if (changed !== '1') {
      throw new PasswordChangeError();
    }

    return true;
  },

  async passwordEnter(wallet, password) {
    const { valid } = await this.call(actions.PASSWORD_ENTER, { wallet, password });
    if (valid !== '1') {
      throw new InvalidPasswordError();
    }

    return true;
  },

  async passwordValid(wallet, password) {
    const { valid } = await this.call(actions.PASSWORD_VALID, { wallet, password });
    if (valid !== '1') {
      throw new InvalidPasswordError();
    }

    return true;
  },
});
