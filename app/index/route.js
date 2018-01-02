import Route from '@ember/routing/route';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service settings: null,

  afterModel(model, transaction) {
    const settings = this.get('settings');
    const wallet = settings.get('wallet');
    if (!wallet) {
      transaction.abort();
      return this.transitionTo('setup');
    }

    return this.transitionTo('wallets', wallet);
  },
});
