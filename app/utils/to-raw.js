import BigNumber from 'npm:bignumber.js';

import getConversion from './get-conversion';

export default function toRaw(value, { unit = 'Mxrb' } = {}) {
  const multiplier = getConversion(unit);
  const multiplicand = BigNumber(value);
  return multiplicand.times(multiplier).toFixed(0);
}
