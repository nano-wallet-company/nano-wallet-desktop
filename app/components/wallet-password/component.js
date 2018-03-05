import Component from '@ember/component';
import { set } from '@ember/object';

import { action } from 'ember-decorators/object';

import ChangePasswordValidations from '../../validations/change-password';

export default Component.extend({
  ChangePasswordValidations,

  wallet: null,
  password: null,

  onSubmit: null,
  onHide: null,

  @action
  clearPassword(changeset) {
    set(changeset, 'password', null);
  },
});
