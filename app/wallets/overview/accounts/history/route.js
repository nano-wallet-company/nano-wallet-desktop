import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { action } from 'ember-decorators/object';

import { hash } from 'rsvp';

export default Route.extend({
  beforeModel() {
    this.controllerFor('wallets.overview').set('hideHistory', false);
    const hideHistory = this.controllerFor('wallets.overview').get('hideHistory');
    this.controllerFor('wallets.overview.accounts.history').set('hideHistory', hideHistory);
  },
  async model() {
    const wallet = this.modelFor('wallets');
    const account = this.modelFor('wallets.overview.accounts');
    const history = await this.store.query('history', {
      account: get(account, 'id'),
      count: 100,
    });

    return hash({
      wallet,
      account,
      history,
    });
  },
  @action
  toggleHistory() {
    this.controllerFor('wallets.overview').toggleProperty('hideHistory');
    this.controllerFor('wallets.overview.accounts.history').toggleProperty('hideHistory');
  },
});
