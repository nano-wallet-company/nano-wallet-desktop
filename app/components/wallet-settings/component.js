import Component from '@ember/component';

import { readOnly } from '@ember-decorators/object/computed';
import { argument } from '@ember-decorators/argument';

import { storage } from '../../decorators';

import ChangeRepresentativeValidations from '../../validations/change-representative';

export default class WalletSettingsComponent extends Component {
  @storage('wallet') settings = null;

  ChangeRepresentativeValidations = ChangeRepresentativeValidations;

  @readOnly('settings.seed') seed = null;

  @argument wallet = null;

  @argument password = null;

  @argument representative = null;

  @argument onChangeRepresentative = null;

  @argument onChangePassword = null;
}
