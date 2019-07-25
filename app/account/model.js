import DS from 'ember-data';

const { Model, attr, hasMany, belongsTo } = DS;

export default class AccountModel extends Model {
  @belongsTo('wallet', { async: true }) wallet;

  @belongsTo('frontier', { async: true }) frontier;

  @belongsTo('block', { async: true, inverse: null }) openBlock;

  @belongsTo('block', { async: true, inverse: null }) representativeBlock;

  @hasMany('block', { async: true, inverse: 'source' }) blocks;

  @hasMany('history', { async: true, inverse: 'source' }) history;

  @attr('big-number', { defaultValue: 0 }) balance;

  @attr('big-number', { defaultValue: 0 }) pending;

  @attr('string') representative;

  @attr('number', { defaultValue: 0 }) blockCount;

  @attr('number', { defaultValue: 0 }) weight;

  @attr('timestamp', { defaultValue: () => new Date() }) modifiedTimestamp;
}
