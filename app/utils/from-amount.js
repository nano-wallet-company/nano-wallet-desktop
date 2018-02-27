import BigNumber from 'npm:bignumber.js';

import getConversion, { DEFAULT_UNIT } from './get-conversion';

export default function fromAmount(value, { unit = DEFAULT_UNIT } = {}) {
  const divisor = getConversion(unit);
  return BigNumber(value).dividedBy(divisor);
}
