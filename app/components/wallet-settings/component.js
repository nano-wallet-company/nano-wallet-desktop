import Component from '@ember/component';

import { on } from '@ember-decorators/object';

import { storage } from '../../decorators';

import ChangeRepresentativeValidations from '../../validations/change-representative';

export default class WalletSettingsComponent extends Component {
  @storage('wallet') settings;

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
