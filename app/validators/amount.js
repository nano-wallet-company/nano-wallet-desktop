import { validateFormat } from 'ember-changeset-validations/validators';

export const regex = /^(\d+\.?\d*|\.\d+)$/;

export default function validateAmount(options = {}) {
  return validateFormat(Object.assign({}, options, { regex }));
}
