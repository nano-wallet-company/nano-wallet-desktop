import Component from '@ember/component';

import { overridableReads } from '@ember-decorators/object/computed';

import { storage } from '../../decorators';

import ChangeRepresentativeValidations from '../../validations/change-representative';

export default class WalletSettingsComponent extends Component {
  @storage('wallet') settings;

  ChangeRepresentativeValidations = ChangeRepresentativeValidations;

  @overridableReads('settings.seed') seed;

  wallet = null;

  password = null;

  representative = null;

  onChangeRepresentative = null;

  onChangePassword = null;
}
