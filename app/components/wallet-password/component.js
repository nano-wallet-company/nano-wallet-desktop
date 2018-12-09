import Component from '@ember/component';
import { get, setProperties } from '@ember/object';

import { defineError } from 'ember-exex/error';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

import ChangePasswordValidations from '../../validations/change-password';

export const PasswordConfirmationError = defineError({
  name: 'PasswordConfirmationError',
  message: 'Password confirmation does not match password',
});

export default class WalletPasswordComponent extends Component {
  @service intl;

  @service flashMessages;

  ChangePasswordValidations = ChangePasswordValidations;

  wallet = null;

  password = null;

  passwordConfirm = null;

  onSubmit = null;

  @action
  confirmPassword(changeset) {
    const flashMessages = this.get('flashMessages');
    const password = get(changeset, 'password');
    const passwordConfirm = get(changeset, 'passwordConfirm');
    if (password !== passwordConfirm) {
      const message = this.get('intl').t('wallets.settings.passwordsDontMatch');
      flashMessages.danger(message);
      throw new PasswordConfirmationError();
    }

    return true;
  }

  @action
  clearPassword(changeset) {
    setProperties(changeset, {
      password: null,
      passwordConfirm: null,
    });
  }
}
