import { validateFormat } from 'ember-changeset-validations/validators';

export default function validateSeed() {
  return validateFormat({ regex: /^[a-fA-F0-9]{64}$/ });
}
