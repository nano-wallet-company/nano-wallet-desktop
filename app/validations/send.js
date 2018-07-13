import { validatePresence, validateLength } from 'ember-changeset-validations/validators';

import validateAccount from '../validators/account';

export default {
  destination: [
    validatePresence(true),
    validateLength({ min: 64, max: 65 }),
    validateAccount(),
  ],
  amount: validatePresence(true),
};
