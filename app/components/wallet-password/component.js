import Component from '@ember/component';

import ChangePasswordValidations from '../../validations/change-password';

export default Component.extend({
  ChangePasswordValidations,

  wallet: null,
  password: null,
  onSubmit: null,
});
