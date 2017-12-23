import Route from '@ember/routing/route';

import { action } from 'ember-decorators/object';

export default Route.extend({
  @action
  createAccount(wallet) {
    const account = this.store.createRecord('account', { wallet });
    return account.save();
  },
});
