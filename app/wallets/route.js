import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    const account = this.store.findRecord('account', 'xrb_1i8x3i4666yekktoc6sz5hcihegarxyrqx68hz6mhw3w61x6tghidatyioa7');
    this.transitionTo('wallets.accounts', account);
  }
});
