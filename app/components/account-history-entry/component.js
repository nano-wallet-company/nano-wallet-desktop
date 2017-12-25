import Row from 'ember-light-table/components/lt-row';

import { alias, equal } from 'ember-decorators/object/computed';

export default Row.extend({
  classNameBindings: ['isSend:text-danger', 'isReceive:text-success'],

  @alias('row.content.type') type: null,
  @equal('type', 'send') isSend: false,
  @equal('type', 'receive') isReceive: false,
});
