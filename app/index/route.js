import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  settings: service(),

  async beforeModel(transition) {
    const settings = get(this, 'settings');
    let wallet = settings.get('wallet');
    if (!wallet) {
      transition.abort();
      wallet = await this.store.createRecord('wallet').save();
      settings.setProperties(this.store.serialize(wallet, { includeId: true }));
      return this.transitionTo('wallets', wallet);
    }
  },
});
