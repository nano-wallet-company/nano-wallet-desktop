import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (!serialized) {
      return null;
    }

    return new Date(Math.round(serialized * 1000));
  },

  serialize(deserialized) {
    if (!deserialized) {
      return null;
    }

    return String(Math.round(deserialized / 1000));
  },
});
