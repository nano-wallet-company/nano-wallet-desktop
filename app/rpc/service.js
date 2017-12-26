import Service from '@ember/service';
import { assign } from '@ember/polyfills';
import { A } from '@ember/array';

import { service } from 'ember-decorators/service';

export const actions = {
  WALLET_CREATE: 'wallet_create',
  ACCOUNT_CREATE: 'account_create',
  ACCOUNT_INFO: 'account_info',
  WALLET_BALANCE_TOTAL: 'wallet_balance_total',
  ACCOUNT_LIST: 'account_list',
  SEND: 'send',
  ACCOUNT_HISTORY: 'account_history',
  PEERS: 'peers',
  BLOCK_COUNT: 'block_count',
};

export default Service.extend({
  @service ajax: null,

  call(action, params = {}) {
    const data = assign({ action }, params);
    return this.get('ajax').post('/', { data });
  },

  walletCreate() {
    return this.call(actions.WALLET_CREATE);
  },

  accountCreate(wallet) {
    return this.call(actions.ACCOUNT_CREATE, { wallet });
  },

  async accountInfo(account, pending = true) {
    let info = await this.call(actions.ACCOUNT_INFO, {
      account,
      pending,
    });

    // When an account has no transactions, the RPC replies with an
    // HTTP 200 OK *and* an error.
    if (info && info.error === 'Account not found') {
      info = { account, balance: '0' };
      if (pending) {
        info.pending = '0';
      }
    }

    return info;
  },

  walletBalanceTotal(wallet) {
    return this.call(actions.WALLET_BALANCE_TOTAL, { wallet });
  },

  accountList(wallet) {
    return this.call(actions.ACCOUNT_LIST, { wallet });
  },

  send(wallet, source, destination, amount) {
    return this.call(actions.SEND, {
      wallet,
      source,
      destination,
      amount,
    });
  },

  async accountHistory(account, count = 1) {
    const { history } = await this.call(actions.ACCOUNT_HISTORY, {
      account,
      count,
    });

    return A(history);
  },

  async peers() {
    const { peers } = await this.call(actions.PEERS);

    // When there are no peers, the RPC replies with an empty string.
    if (!peers) {
      return Object.create(null);
    }

    return Object.entries(peers).reduce((acc, [key, value]) => {
      acc[key] = parseInt(value, 10);
      return acc;
    }, Object.create(null));
  },

  blockCount() {
    return this.call(actions.BLOCK_COUNT);
  },
});
