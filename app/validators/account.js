import { validateFormat } from 'ember-changeset-validations/validators';

export default function validateAccount() {
  return validateFormat({ regex: /^xrb_[a-z0-9]{60}$/ });
}
