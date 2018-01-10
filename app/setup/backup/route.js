import Route from '@ember/routing/route';
import { set } from '@ember/object';

import { action } from 'ember-decorators/object';

import bip39 from 'npm:bip39';

export default Route.extend({
  model() {
    const wallet = this.modelFor('setup');
    const seed = bip39.mnemonicToSeedHex(bip39.generateMnemonic()).substr(0, 64);
    const mnemonic = bip39.entropyToMnemonic(seed);
    return {
      wallet,
      seed,
      mnemonic,
    };
  },

  @action
  cancel() {
    return this.transitionTo('setup');
  },

  @action
  done(wallet, seed) {
    set(wallet, 'seed', seed);
    return this.transitionTo('setup.password', wallet.save());
  },
});
