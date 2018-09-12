import DS from 'ember-data';

import BigNumber from 'npm:bignumber.js';

const { Transform } = DS;

export default class BigNumberTransform extends Transform {
  deserialize(serialized = 0) {
    return BigNumber(serialized);
  }

  serialize(deserialized = 0) {
    return BigNumber(deserialized).toFixed();
  }
}
