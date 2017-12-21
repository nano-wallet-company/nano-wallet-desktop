import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

import { hash } from 'rsvp';

export default Route.extend({
  rpc: service('rpc'),

  model() {
    const rpc = this.get('rpc');
    const wallet = this.modelFor('wallets');
    return hash({
      wallet,
      totals: rpc.walletBalanceTotal(get(wallet, 'id')),
    });
  },

  actions: {
    createAccount(wallet) {
      const account = this.store.createRecord('account', { wallet });
      return account.save();
    },
  },
});
