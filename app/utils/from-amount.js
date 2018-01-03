import BigNumber from 'npm:bignumber.js';

import getConversion from './get-conversion';

export default function fromAmount(value, { unit = 'Mxrb' } = {}) {
  const divisor = getConversion(unit);
  return BigNumber(value).dividedBy(divisor);
}
