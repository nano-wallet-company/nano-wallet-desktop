import ObjectProxy from '@ember/object/proxy';

import { storageFor } from 'ember-local-storage';

const Service = ObjectProxy.extend({
  content: storageFor('settings'),
});

Service.reopenClass({
  isServiceFactory: true,
});

export default Service;
