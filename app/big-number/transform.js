import DS from 'ember-data';

import BigNumber from 'npm:bignumber.js';

export default DS.Transform.extend({
  deserialize(serialized = 0) {
    return BigNumber(serialized);
  },

  serialize(deserialized = 0) {
    return BigNumber(deserialized).toFixed();
  },
});
