import { validatePresence } from 'ember-changeset-validations/validators';

import validateAccount from '../validators/account';

export default {
  account: validatePresence(true),
  destination: validateAccount(),
  amount: validatePresence(true),
};
