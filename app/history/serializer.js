import { JSONSerializer } from 'ember-data';

export default JSONSerializer.extend({
  primaryKey: 'hash',
});
