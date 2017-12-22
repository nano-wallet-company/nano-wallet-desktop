import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';
import { A } from '@ember/array';

const WALLET_CREATE        = 'wallet_create';
const ACCOUNT_CREATE       = 'account_create';
const ACCOUNT_INFO         = 'account_info';
const WALLET_BALANCE_TOTAL = 'wallet_balance_total';
const ACCOUNT_LIST         = 'account_list';
const SEND                 = 'send';
const ACCOUNT_HISTORY      = 'account_history';

export default Service.extend({
  ajax: service(),

  call(action, params = {}) {
    const data = assign({ action }, params);
    return this.get('ajax').post('/', { data });
  },

  walletCreate() {
    return this.call(WALLET_CREATE);
  },

  accountCreate(wallet) {
    return this.call(ACCOUNT_CREATE, { wallet });
  },

  async accountInfo(account, pending = true) {
    let info = await this.call(ACCOUNT_INFO, { account, pending });

    // When an account has no transactions, the RPC seems to return an
    // HTTP OK *and* an error.
    if (info.error === 'Account not found') {
      info = { account, balance: "0" };
      if (pending) {
        info.pending = "0";
      }
    }

    return info;
  },

  walletBalanceTotal(wallet) {
    return this.call(WALLET_BALANCE_TOTAL, { wallet });
  },

  accountList(wallet) {
    return this.call(ACCOUNT_LIST, { wallet });
  },

  send(wallet, source, destination, amount) {
    return this.call(SEND, {
      wallet,
      source,
      destination,
      amount,
    });
  },

  async accountHistory(account, count = 1) {
    const { history } = await this.call(ACCOUNT_HISTORY, {
      account,
      count,
    });

    return A(history);
  },
});
