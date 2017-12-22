import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  parentAccount: belongsTo('account'),

  // hash: attr('string'),
  type: attr('string'),
  account: attr('string'),
  amount: attr('big-number'),
});
