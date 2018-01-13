import Route from '@ember/routing/route';

import { action } from 'ember-decorators/object';

import generateSeed from '../../utils/generate-seed';

export default Route.extend({
  model() {
    const wallet = this.modelFor('setup');
    const seed = generateSeed();
    return {
      wallet,
      seed,
    };
  },

  @action
  cancel() {
    return this.transitionTo('setup');
  },

  @action
  done(wallet) {
    return this.transitionTo('setup.password', wallet.save());
  },
});
