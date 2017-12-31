import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { action } from 'ember-decorators/object';

export default Route.extend({
  afterModel(model) {
    return get(model, 'accounts').reload();
  },

  @action
  createAccount(wallet) {
    const account = this.store.createRecord('account', { wallet });
    return this.transitionTo('wallets.accounts', account.save());
  },
});
