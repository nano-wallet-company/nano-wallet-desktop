import { assign } from '@ember/polyfills';
import { validateFormat } from 'ember-changeset-validations/validators';

export const regex = /^[a-fA-F0-9]{64}$/;

export default function validateSeed(options = {}) {
  return validateFormat(assign({}, options, { regex }));
}
