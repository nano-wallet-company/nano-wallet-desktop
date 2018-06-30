import Component from '@ember/component';

import { storageFor } from 'ember-local-storage';

import { action, readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

import downloadjs from 'npm:downloadjs';
import ChangeRepresentativeValidations from '../../validations/change-representative';


export default Component.extend({
  ChangeRepresentativeValidations,

  settings: storageFor('settings', 'wallet'),

  @readOnly
  @alias('settings.seed') seed: null,

  wallet: null,
  password: null,
  representative: null,

  onChangeRepresentative: null,
  onChangePassword: null,

  revealSeed: null,
  changeRep: null,
  changePass: null,
  revealMnemonic: null,

  @action
  copyMnemonic() {
    const message = this.get('intl').t('wallets.backup.copied');
    this.get('flashMessages').success(message);
  },

  @action
  downloadMnemonic(mnemonic) {
    const fileName = String(mnemonic).split(' ').slice(0, 2).join('-');
    downloadjs(mnemonic, fileName, 'text/plain');
  },
});
