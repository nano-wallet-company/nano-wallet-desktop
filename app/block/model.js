import DS from 'ember-data';

export default DS.Model.extend({
  wallet: DS.belongsTo('wallet', { inverse: null }),
  source: DS.belongsTo('account', { inverse: 'blocks' }),

  destination: DS.attr('string'),
  amount: DS.attr('big-number'),
});
