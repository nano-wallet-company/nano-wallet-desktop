import Component from '@ember/component';

export default Component.extend({
  wallet: null,
  totals: null,

  actions: {
    createAccount(wallet) {
      this.sendAction('createAccount', wallet);
    }
  }
});
