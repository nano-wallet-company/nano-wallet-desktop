import Service from '@ember/service';
import { assign } from '@ember/polyfills';
import { A } from '@ember/array';

import { service } from 'ember-decorators/service';

import { defineError } from 'ember-exex/error';

export const actions = {
  VERSION: 'version',
  WALLET_CREATE: 'wallet_create',
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
};

const RPCError = defineError({
  name: 'RPCError',
  message: 'RPC error',
});

export default Service.extend({
  @service ajax: null,

  async call(action, params = {}) {
    const data = assign({ action }, params);
    const resp = await this.get('ajax').post('/', { data });
    if (typeof resp.error === 'string') {
      throw new RPCError(resp.error);
    }

    return resp;
  },

  version() {
    return this.call(actions.VERSION);
  },

  walletCreate() {
    return this.call(actions.WALLET_CREATE);
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
      if (!(err instanceof RPCError)) {
        throw err;
      }

      // When an account has no transactions, the RPC replies with an
      // HTTP 200 OK *and* an error.
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
});
