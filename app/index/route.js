import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    const wallet = this.store.createRecord('wallet');
    this.transitionTo('wallets', wallet.save());
  }
});
