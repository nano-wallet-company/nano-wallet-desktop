import DS from 'ember-data';

export default DS.Model.extend({
  wallet: DS.belongsTo('wallet'),

  balance: DS.attr(),
});
