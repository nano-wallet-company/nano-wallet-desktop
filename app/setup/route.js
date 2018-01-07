import Route from '@ember/routing/route';

import { action } from 'ember-decorators/object';

export default Route.extend({
  model() {
    return this.store.createRecord('wallet');
  },

  @action
  downloadDatabase() {
    return this.transitionTo('setup.download');
  },

  @action
  createWallet() {
    return this.transitionTo('setup.backup');
  },

  @action
  importWallet() {
    return this.transitionTo('setup.import');
  },
});
