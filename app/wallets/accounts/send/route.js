import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { hash } from 'rsvp';

export default Route.extend({
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

  actions: {
    changeSource(source) {
      return this.transitionTo(this.routeName, source);
    },

    async sendAmount(changeset) {
      await changeset.save();
      return this.transitionTo('wallets.accounts');
    }
  }
});
