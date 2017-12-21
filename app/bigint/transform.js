import DS from 'ember-data';

import bigInt from 'npm:big-integer';

export default DS.Transform.extend({
  deserialize(serialized) {
    return bigInt(serialized);
  },

  serialize(deserialized) {
    return deserialized;
  }
});
