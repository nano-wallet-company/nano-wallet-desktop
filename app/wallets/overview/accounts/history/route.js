import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import { action } from 'ember-decorators/object';

import { hash } from 'rsvp';

export default Route.extend({
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

  setupController(controller, model) {
    const overviewController = this.controllerFor('wallets.overview');
    set(overviewController, 'hideHistory', false);
    set(controller, 'hideHistory', false);
    return this._super(controller, model);
  },

  deactivate() {
    const overviewController = this.controllerFor('wallets.overview');
    set(overviewController, 'hideHistory', true);
    set(this.controller, 'hideHistory', true);
  },

  @action
  hideHistory() {
    return this.transitionTo('wallets.overview');
  },
});
