import DS from 'ember-data';

import { attr, hasMany, belongsTo } from 'ember-decorators/data';

const { Model } = DS;

export default Model.extend({
  @belongsTo({ async: true }) wallet: null,

  @hasMany({ async: true, inverse: 'source' }) blocks: null,
  @hasMany({ async: true, inverse: 'source' }) history: null,

  @attr('big-number', { defaultValue: 0 }) balance: null,
  @attr('big-number', { defaultValue: 0 }) pending: null,

  @attr('timestamp', { defaultValue: () => new Date() }) modifiedTimestamp: null,
});
