import DS from 'ember-data';

import { attr, hasMany, belongsTo } from 'ember-decorators/data';

export default DS.Model.extend({
  @belongsTo() wallet: null,

  @hasMany({ async: true, inverse: 'source' }) blocks: null,
  @hasMany({ async: true, inverse: 'source' }) history: null,

  @attr('big-number') balance: null,
  @attr('big-number') pending: null,
});
