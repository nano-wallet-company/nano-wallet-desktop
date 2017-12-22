import Route from '@ember/routing/route';

export default Route.extend({
  breadCrumb: {
    title: 'Wallet',
    path: 'wallets.overview',
  },

  redirect() {
    this.transitionTo('wallets.overview');
  },
});
