import DS from 'ember-data';

import { underscore } from '@ember/string';

const { JSONSerializer } = DS;

export default class AccountSerializer extends JSONSerializer {
  primaryKey = 'account';

  keyForAttribute(attr) {
    return underscore(attr);
  }
}
