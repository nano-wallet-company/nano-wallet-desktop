import Component from '@ember/component';

import ChangeRepresentativeValidations from '../../validations/change-representative';

export default Component.extend({
  ChangeRepresentativeValidations,

  wallet: null,
  password: null,
  representative: null,

  onChangeRepresentative: null,
  onChangePassword: null,
});
