import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    sendAmount(changeset) {
      const wallet = this.modelFor('wallets');
      const { source, destination, amount } = changeset.getProperties('source', 'destination', 'amount');
      const block = this.store.createRecord('block', {
        wallet,
        source,
        destination,
        amount,
      });

      return block.save();
    }
  }
});
