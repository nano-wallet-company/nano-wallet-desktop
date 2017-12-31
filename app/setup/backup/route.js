import Route from '@ember/routing/route';
import { set } from '@ember/object';

import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

import bip39 from 'npm:bip39';
import downloadjs from 'npm:downloadjs';

export default Route.extend({
  @service flashMessages: null,

  model() {
    const wallet = this.modelFor('setup');
    const seed = bip39.mnemonicToSeedHex(bip39.generateMnemonic()).substr(0, 64);
    const mnemonic = bip39.entropyToMnemonic(seed);
    set(wallet, 'seed', seed);
    return {
      wallet,
      mnemonic,
    };
  },

  @action
  cancel() {
    return this.transitionTo('setup');
  },

  @action
  copySeed() {
    this.get('flashMessages').success('Seed copied to clipboard!');
  },

  @action
  downloadMnemonic(mnemonic) {
    const fileName = String(mnemonic).split(' ').slice(0, 2).join('-');
    downloadjs(mnemonic, fileName, 'text/plain');
  },

  @action
  done(wallet) {
    return this.transitionTo('wallets', wallet.save());
  },
});
