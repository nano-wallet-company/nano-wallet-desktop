import DS from 'ember-data';

export default DS.Model.extend({
  wallet: DS.belongsTo('wallet'),
  blocks: DS.hasMany('block', { inverse: 'source' }),

  balance: DS.attr('big-number'),
  pending: DS.attr('big-number'),
});
