import { JSONSerializer } from 'ember-data';

import { underscore } from '@ember/string';

export default JSONSerializer.extend({
  primaryKey: 'account',

  keyForAttribute(attr) {
    return underscore(attr);
  },
});
