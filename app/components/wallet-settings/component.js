import Component from '@ember/component';

import { storageFor } from 'ember-local-storage';

import { readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

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
});
