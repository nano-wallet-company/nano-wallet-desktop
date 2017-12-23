import DS from 'ember-data';

import { attr, belongsTo } from 'ember-decorators/data';

export default DS.Model.extend({
  @belongsTo('account') source: null,

  @attr type: null,
  @attr account: null,
  @attr('big-number') amount: null,
});
