import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  async afterModel(model) {
    const source = await get(model, 'accounts.firstObject');
    return this.transitionTo('wallets.overview.accounts.send', source);
  },
});
