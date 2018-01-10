import Service from '@ember/service';
import { get, set } from '@ember/object';

import { storageFor } from 'ember-local-storage';

export default Service.extend({
  settings: storageFor('settings'),

  unknownProperty(keyName) {
    const settings = get(this, 'settings');
    return get(settings, keyName);
  },

  setUnknownProperty(keyName, value) {
    const settings = get(this, 'settings');
    return set(settings, keyName, value);
  },
});
