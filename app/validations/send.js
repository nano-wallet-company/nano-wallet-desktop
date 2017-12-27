import { validatePresence } from 'ember-changeset-validations/validators';

import validateAccount from '../validators/account';
import validateAmount from '../validators/amount';

export default {
  source: validatePresence(true),
  destination: validateAccount(),
  amount: validateAmount(),
};
