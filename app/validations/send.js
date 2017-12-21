import { validatePresence } from 'ember-changeset-validations/validators';

import validateAccount from '../validators/account';

export default {
  source: validatePresence(true),
  destination: validateAccount(),
  amount: validatePresence(true),
};
