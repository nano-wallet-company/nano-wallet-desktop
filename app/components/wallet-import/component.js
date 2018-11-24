import Component from '@ember/component';
import { get, set } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

import bip39 from 'bip39';

import { storage } from '../../decorators';

import ImportWalletValidations from '../../validations/import-wallet';

export default class WalletImportComponent extends Component {
  @service intl;

  @storage('wallet') settings;

  ImportWalletValidations = ImportWalletValidations;

  type = 'seed';

  wallet = null;

  seed = null;

  onChange = null;

  onCancel = null;

  onSubmit = null;

  @action
  convertMnemonic(changeset) {
    const type = this.get('type');
    if (type === 'mnemonic') {
      const mnemonic = get(changeset, 'mnemonic');
      const seed = bip39.mnemonicToEntropy(mnemonic);
      set(changeset, 'seed', seed);
    }
  }

  @action
  async saveWallet(model, changeset) {
    const wallet = await model.save();
    this.set('wallet', wallet);

    const settings = this.get('settings');
    const seed = get(changeset, 'seed');
    const createdAt = new Date().toISOString();
    tryInvoke(settings, 'setProperties', [{ seed, createdAt }]);
    return wallet;
  }

  @action
  clearSeed(changeset) {
    set(changeset, 'seed', null);
    tryInvoke(changeset, 'destroy');
  }
}
