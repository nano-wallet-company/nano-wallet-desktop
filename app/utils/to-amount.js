import BigNumber from 'npm:bignumber.js';

import getConversion, { DEFAULT_UNIT } from './get-conversion';

export default function toAmount(value, { unit = DEFAULT_UNIT } = {}) {
  const multiplier = getConversion(unit);
  const multiplicand = BigNumber(value);
  return multiplicand.times(multiplier);
}
