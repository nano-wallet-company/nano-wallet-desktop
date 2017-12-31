import Route from '@ember/routing/route';

import { action } from 'ember-decorators/object';

export default Route.extend({
  @action
  createWallet() {
    const wallet = this.store.createRecord('wallet');
    return this.transitionTo('wallets', wallet.save());
  },

  @action
  importWallet() {
    return this.transitionTo('setup.import');
  },
});
