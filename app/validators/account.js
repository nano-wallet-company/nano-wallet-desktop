import { validateFormat } from 'ember-changeset-validations/validators';

export default function validateAccount() {
  return validateFormat({ regex: /^xrb_[13](?![lv])[a-z1-9]{59}$/ });
}
