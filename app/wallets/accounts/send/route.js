import Route from '@ember/routing/route';

export default Route.extend({
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
