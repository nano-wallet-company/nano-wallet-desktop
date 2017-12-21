import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';

export default Service.extend({
  ajax: service(),

  call(action, params = {}) {
    const data = assign({ action }, params);
    return this.get('ajax').post('/', { data });
  },

  walletCreate() {
    return this.call('wallet_create');
  },

  accountCreate(wallet) {
    return this.call('account_create', { wallet });
  },

  async accountInfo(account, pending = true) {
    let info = await this.call('account_info', { account, pending });

    // When an account has no transactions, the RPC seems to return an
    // HTTP OK *and* an error.
    if (info.error === 'Account not found') {
      info = { account, balance: "0" };
      if (pending) {
        info.pending = "0";
      }

      return info;
    }

    return info;
  },

  walletBalanceTotal(wallet) {
    return this.call('wallet_balance_total', { wallet });
  },

  accountList(wallet) {
    return this.call('account_list', { wallet });
  },

  send(wallet, source, destination, amount) {
    return this.call('send', {
      wallet,
      source,
      destination,
      amount,
    });
  },
});
