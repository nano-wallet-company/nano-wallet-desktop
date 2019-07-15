import DS from 'ember-data';

const { Model, belongsTo, hasMany } = DS;

export default class FrontierModel extends Model {
  @belongsTo('wallet', { async: true, inverse: null }) wallet;

  @belongsTo('account', { async: true, inverse: null }) account;

  @belongsTo('block', { async: true, inverse: 'frontier' }) hash;

  @hasMany('block', { async: true, inverse: 'frontier' }) blocks;
}
