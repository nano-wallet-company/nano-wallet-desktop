import { validateLength } from 'ember-changeset-validations/validators';

export default function validatePassword() {
  return validateLength({ min: 8 });
}
