import Component from '@ember/component';
import { get, set } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

import bip39 from 'npm:bip39';

import ImportWalletValidations from '../../validations/import-wallet';

export default Component.extend({
  @service intl: null,

  ImportWalletValidations,

  type: 'seed',
  wallet: null,
  seed: null,

  onChange: null,
  onCancel: null,
  onSubmit: null,

  @action
  convertMnemonic(changeset) {
    const type = this.get('type');
    if (type === 'mnemonic') {
      const mnemonic = get(changeset, 'mnemonic');
      const seed = bip39.mnemonicToEntropy(mnemonic);
      set(changeset, 'seed', seed);
    }
  },

  @action
  clearSeed(changeset) {
    set(changeset, 'seed', null);
    tryInvoke(changeset, 'destroy');
  },
});
