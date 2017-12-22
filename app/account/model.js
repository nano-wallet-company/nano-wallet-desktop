import DS from 'ember-data';

const { attr, hasMany, belongsTo } = DS;

export default DS.Model.extend({
  wallet: belongsTo('wallet'),
  blocks: hasMany('block', { async: true, inverse: 'source' }),
  history: hasMany('history', { async: true, inverse: 'parentAccount' }),

  balance: attr('big-number'),
  pending: attr('big-number'),
});
