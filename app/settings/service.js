import Service from '@ember/service';
import {
  get,
  set,
  getProperties,
  setProperties,
  getWithDefault,
} from '@ember/object';

import { storageFor } from 'ember-local-storage';

export default Service.extend({
  settings: storageFor('settings'),

  get(keyName) {
    const settings = get(this, 'settings');
    return get(settings, keyName);
  },

  set(keyName, value) {
    const settings = get(this, 'settings');
    return set(settings, keyName, value);
  },

  getProperties(...args) {
    const settings = get(this, 'settings');
    return getProperties(settings, ...args);
  },

  setProperties(hash) {
    const settings = get(this, 'settings');
    return setProperties(settings, hash);
  },

  getWithDefault(keyName, defaultValue) {
    const settings = get(this, 'settings');
    return getWithDefault(settings, keyName, defaultValue);
  },
});
