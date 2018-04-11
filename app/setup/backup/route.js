import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { hash } from 'ember-concurrency';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

import generateSeed from '../../utils/generate-seed';

export default Route.extend({
  @service rpc: null,

  model() {
    const wallet = this.modelFor('setup').save();
    const seed = generateSeed();
    return hash({
      wallet,
      seed,
    });
  },

  afterModel(model) {
    const wallet = get(model, 'wallet.id');
    const seed = get(model, 'seed');
    return this.get('rpc').walletChangeSeed(wallet, seed);
  },

  @action
  cancel() {
    return this.transitionTo('setup');
  },

  @action
  done(wallet) {
    return this.transitionTo('setup.password', wallet);
  },
});
