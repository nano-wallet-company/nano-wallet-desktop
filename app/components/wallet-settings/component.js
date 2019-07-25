import Component from '@ember/component';

import { on } from '@ember-decorators/object';

import { storageFor } from 'ember-local-storage';

import ChangeRepresentativeValidations from '../../validations/change-representative';

export default class WalletSettingsComponent extends Component {
  @storageFor('settings', 'wallet') settings;

  ChangeRepresentativeValidations = ChangeRepresentativeValidations;

  wallet = null;

  seed = null;

  password = null;

  representative = null;

  onChangeRepresentative = null;

  onChangePassword = null;

  @on('willDestroyElement')
  clear() {
    this.set('seed', null);
  }
}
