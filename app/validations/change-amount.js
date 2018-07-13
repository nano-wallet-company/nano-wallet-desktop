import { validatePresence } from 'ember-changeset-validations/validators';

import validateAmount from '../validators/amount';

export default {
  amount: [
    validatePresence(true),
    validateAmount(),
  ],
};
