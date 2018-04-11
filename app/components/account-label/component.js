import Component from '@ember/component';

import { storageFor } from 'ember-local-storage';

export default Component.extend({
  settings: storageFor('settings', 'account'),

  account: null,
  truncate: false,
});
