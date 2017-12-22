import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  wallet: belongsTo('wallet', { inverse: null }),
  source: belongsTo('account', { inverse: 'blocks' }),

  destination: attr('string'),
  amount: attr('big-number'),
});
