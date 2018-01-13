import Route from '@ember/routing/route';

import { action } from 'ember-decorators/object';

export default Route.extend({
  @action
  cancel() {
    return this.transitionTo('setup');
  },

  @action
  changeType(type) {
    return this.transitionTo({ queryParams: { type } });
  },

  @action
  saveWallet(wallet) {
    return wallet.save();
  },

  @action
  changeSeed(wallet) {
    return this.transitionTo('setup.password', wallet.save());
  },
});
