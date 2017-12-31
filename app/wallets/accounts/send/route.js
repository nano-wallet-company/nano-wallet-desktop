import Route from '@ember/routing/route';

import { action } from 'ember-decorators/object';

export default Route.extend({
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  breadCrumb: {
    title: 'Send',
    path: 'wallets.accounts.send',
  },

  model() {
    const wallet = this.modelFor('wallets');
    const source = this.modelFor('wallets.accounts');
    return this.store.createRecord('block', {
      wallet,
      source,
      destination: null,
      amount: null,
    });
  },

  @action
  changeSource(source) {
    return this.transitionTo(this.routeName, source);
  },

  @action
  async sendAmount(changeset) {
    await changeset.save();
    const account = this.modelFor('wallets.accounts');
    return this.transitionTo('wallets.accounts', account.reload());
  },
});
