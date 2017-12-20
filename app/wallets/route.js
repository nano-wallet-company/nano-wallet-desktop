import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    const account = this.store.findRecord('account', 'xrb_3e3j5tkog48pnny9dmfzj1r16pg8t1e76dz5tmac6iq689wyjfpiij4txtdo');
    this.transitionTo('wallets.accounts', account);
  },

  actions: {
    createAccount() {
      this.store.createRecord('account', {
        wallet: '5884EFFA051F8363A4CCFAB1CBECCA4E0CD13DC4D125722ED75E8CD37FC55662'
      });
    }
  }
});
