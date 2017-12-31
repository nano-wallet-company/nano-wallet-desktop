import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  primaryKey: 'wallet',

  attrs: {
    balance: { serialize: false },
    pending: { serialize: false },
    seed: { serialize: false },
  },
});
