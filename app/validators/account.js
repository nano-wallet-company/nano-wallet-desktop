import { assign } from '@ember/polyfills';
import { validateFormat } from 'ember-changeset-validations/validators';

export const regex = /^(xrb|nano)(_|-)[13]((?![lv])[a-z1-9]){59}$/;

export default function validateAccount(options = {}) {
  return validateFormat(assign({}, options, { regex }));
}
