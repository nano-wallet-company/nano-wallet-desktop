import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { action } from 'ember-decorators/object';

export default Route.extend({
  renderTemplate() {
    this.render('wallets.overview.accounts.send', {
      into: 'wallets.overview',
      outlet: 'sendOutlet',
    });
  },

  model() {
    const wallet = this.modelFor('wallets');
    const source = this.modelFor('wallets.overview.accounts');
    return this.store.createRecord('block', {
      wallet,
      source,
      destination: null,
      amount: null,
    });
  },

  afterModel() {
    this.controllerFor('wallets.overview').set('expand', true);
  },

  @action
  changeSource(source) {
    return this.transitionTo(this.routeName, source);
  },

  @action
  async sendAmount(changeset) {
    const block = await changeset.save();
    const source = await get(block, 'source');
    const wallet = await get(source, 'wallet');
    return this.transitionTo('wallets.overview', wallet.reload());
  },
});
