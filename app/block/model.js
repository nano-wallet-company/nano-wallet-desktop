import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default class BlockModel extends Model {
  @belongsTo('wallet', { async: true, inverse: 'blocks' }) wallet;

  @belongsTo('account', { async: true, inverse: 'blocks' }) account;

  @belongsTo('frontier', { async: true, inverse: 'blocks' }) frontier;

  @belongsTo('block', { async: true, inverse: null }) previous;

  @belongsTo('account', { async: true, inverse: null }) representative;

  @belongsTo('account', { async: true, inverse: 'blocks' }) source;

  @attr('string', { defaultValue: 'state' }) type;

  @attr('string') destination;

  @attr('big-number', { defaultValue: 0 }) amount;
}
