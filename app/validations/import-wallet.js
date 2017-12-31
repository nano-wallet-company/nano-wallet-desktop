import { get } from '@ember/object';

import { validatePresence } from 'ember-changeset-validations/validators';

import validateSeed from '../validators/seed';

const when = (dependentKey, value, validator) => (key, newValue, oldValue, changes, content) => {
  if (get(content, dependentKey) === value) {
    return validator(key, newValue, oldValue, changes, content);
  }

  return true;
};

export default {
  seed: when('type', 'seed', validateSeed()),
  mnemonic: when('type', 'mnemonic', validatePresence(true)),
};
