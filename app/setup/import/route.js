import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

export default Route.extend({
  @service rpc: null,

  model() {
    return this.store.createRecord('wallet');
  },

  @action
  saveWallet(wallet) {
    return wallet.save();
  },

  @action
  changeSeed(wallet, changeset) {
    const rpc = this.get('rpc');
    const seed = get(changeset, 'seed');
    const model = rpc.walletChangeSeed(get(wallet, 'id'), seed).then(() => wallet);
    return this.transitionTo('wallets', model);
  },

  @action
  cancel() {
    return this.transitionTo('setup');
  },
});
