import DS from 'ember-data';

import { underscore } from '@ember/string';

const { JSONSerializer } = DS;

export default JSONSerializer.extend({
  primaryKey: 'account',

  keyForAttribute(attr) {
    return underscore(attr);
  },
});
