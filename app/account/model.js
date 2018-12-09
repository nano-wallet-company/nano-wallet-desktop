import DS from 'ember-data';

import { attr, hasMany, belongsTo } from '@ember-decorators/data';

const { Model } = DS;

export default class AccountModel extends Model {
  @belongsTo({ async: true }) wallet;

  @belongsTo('block', { async: true, inverse: null }) frontier;

  @belongsTo('block', { async: true, inverse: null }) openBlock;

  @belongsTo('block', { async: true, inverse: null }) representativeBlock;

  @hasMany({ async: true, inverse: 'source' }) blocks;

  @hasMany({ async: true, inverse: 'source' }) history;

  @attr('big-number', { defaultValue: 0 }) balance;

  @attr('big-number', { defaultValue: 0 }) pending;

  @attr('string') representative;

  @attr('number', { defaultValue: 0 }) blockCount;

  @attr('timestamp', { defaultValue: () => new Date() }) modifiedTimestamp;
}
