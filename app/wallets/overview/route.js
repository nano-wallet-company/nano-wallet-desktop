import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    createAccount(wallet) {
      const account = this.store.createRecord('account', { wallet });
      return account.save();
    },
  },
});
