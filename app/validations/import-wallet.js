import { get } from '@ember/object';

import validateSeed from '../validators/seed';
import validateMnemonic from '../validators/mnemonic';

const when = (dependentKey, value, validator) => (key, newValue, oldValue, changes, content) => {
  if (get(content, dependentKey) === value) {
    return validator(key, newValue, oldValue, changes, content);
  }

  return true;
};

export default {
  seed: when('type', 'seed', validateSeed()),
  mnemonic: when('type', 'mnemonic', validateMnemonic()),
};
