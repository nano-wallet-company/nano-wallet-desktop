import { validateFormat } from 'ember-changeset-validations/validators';

export default function validateAccount() {
  return validateFormat({ regex: /^\d*\.?\d+$/ });
}
