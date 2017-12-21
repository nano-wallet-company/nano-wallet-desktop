import DS from 'ember-data';

export default DS.Model.extend({
  accounts: DS.hasMany('account', { async: true }),

  balance: DS.attr('big-number'),
});
