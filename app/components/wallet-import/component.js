import Component from '@ember/component';
import { get, set } from '@ember/object';

import { action } from 'ember-decorators/object';

import bip39 from 'npm:bip39';

import ImportWalletValidations from '../../validations/import-wallet';

export default Component.extend({
  ImportWalletValidations,

  wallet: null,
  seed: null,

  type: 'seed',

  @action
  convertMnemonic(wallet, changeset) {
    const type = get(changeset, 'type');
    if (type === 'mnemonic') {
      const mnemonic = get(changeset, 'mnemonic');
      const seed = bip39.mnemonicToEntropy(mnemonic);
      set(changeset, 'seed', seed);
    }
  },
});
