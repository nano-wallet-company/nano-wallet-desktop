import buildMessage from 'ember-changeset-validations/utils/validation-errors';

import bip39 from 'npm:bip39';

export default function validateMnemonic(options = {}) {
  return (key, newValue) => {
    const isValid = bip39.validateMnemonic(newValue);
    return isValid || buildMessage(key, { type: 'invalid' }, newValue, options);
  };
}
