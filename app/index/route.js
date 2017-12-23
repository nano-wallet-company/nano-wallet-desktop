import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service settings: null,

  async afterModel(model, transaction) {
    const settings = get(this, 'settings');
    let wallet = settings.get('wallet');
    if (!wallet) {
      transaction.abort();
      wallet = await this.store.createRecord('wallet').save();
      settings.setProperties(this.store.serialize(wallet, { includeId: true }));
      return this.transitionTo('wallets', wallet);
    }

    return this.transitionTo('wallets', wallet);
  },
});
