import { storageFor } from 'ember-local-storage';

import { computedDecoratorWithParams } from '@ember-decorators/utils/computed';

export const storage = computedDecoratorWithParams((target, key, desc, params = []) => {
  const options = params[params.length - 1] || {};
  const storageKey = options.key || key;
  return storageFor(storageKey, ...params.slice(1));
});

export default {
  storage,
};
