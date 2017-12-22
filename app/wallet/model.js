import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  accounts: hasMany('account', { async: true }),

  balance: attr('big-number'),
});
