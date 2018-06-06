import { validateLength } from 'ember-changeset-validations/validators';

import validateAccount from '../validators/account';

export default {
  label: validateLength({ allowBlank: true }),
  representative: validateAccount({ allowBlank: true }),
};
