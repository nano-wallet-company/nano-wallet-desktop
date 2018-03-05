import DS from 'ember-data';

import getTimestamp from '../utils/get-timestamp';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (!serialized) {
      return;
    }

    return new Date(Math.round(serialized * 1000));
  },

  serialize(deserialized) {
    if (!deserialized) {
      return;
    }

    return String(Math.round(deserialized / 1000));
  },
});
