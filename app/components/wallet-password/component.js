import Component from '@ember/component';
import { get, setProperties, action } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import { defineError } from 'ember-exex/error';

import { inject as service } from '@ember/service';
import { on } from '@ember-decorators/object';

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

  @on('willDestroyElement')
  clear() {
    this.setProperties({
      password: null,
      passwordConfirm: null,
    });
  }

  @action
  confirmPassword(changeset) {
    const flashMessages = this.get('flashMessages');
    const password = get(changeset, 'password');
    const passwordConfirm = get(changeset, 'passwordConfirm');

    // eslint-disable-next-line security/detect-possible-timing-attacks
    if (password !== passwordConfirm) {
      const message = this.get('intl').t('wallets.settings.passwordsDontMatch');
      flashMessages.danger(message);
      throw new PasswordConfirmationError();
    }

    return true;
  }

  @action
  destroyChangeset(changeset) {
    setProperties(changeset, {
      password: null,
      passwordConfirm: null,
    });

    tryInvoke(changeset, 'destroy');
  }
}
