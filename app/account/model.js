import DS from 'ember-data';

import { attr, hasMany, belongsTo } from '@ember-decorators/data';

const { Model } = DS;

export default class AccountModel extends Model {
  @belongsTo({ async: true }) wallet = null;

  @belongsTo('block', { async: true, inverse: null }) frontier = null;

  @belongsTo('block', { async: true, inverse: null }) openBlock = null;

  @belongsTo('block', { async: true, inverse: null }) representativeBlock = null;

  @hasMany({ async: true, inverse: 'source' }) blocks = null;

  @hasMany({ async: true, inverse: 'source' }) history = null;

  @attr('big-number', { defaultValue: 0 }) balance = null;

  @attr('big-number', { defaultValue: 0 }) pending = null;

  @attr('string') representative = null;

  @attr('number') blockCount = null;

  @attr('timestamp', { defaultValue: () => new Date() }) modifiedTimestamp = null;
}
