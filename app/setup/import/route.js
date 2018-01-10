import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

import { action } from 'ember-decorators/object';

export default Route.extend({
  @action
  saveWallet(wallet) {
    return wallet.save();
  },

  @action
  changeSeed(wallet, changeset) {
    const seed = get(changeset, 'seed');
    set(wallet, 'seed', seed);
    return this.transitionTo('wallets', wallet.save());
  },

  @action
  cancel() {
    return this.transitionTo('setup.password');
  },
});
