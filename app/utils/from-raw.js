import BigNumber from 'npm:bignumber.js';

import getConversion from './get-conversion';

export default function fromRaw(value, { unit = 'Mxrb', precision = 6 } = {}) {
  const divisor = getConversion(unit);
  const quotient = BigNumber(value).dividedBy(divisor);
  const digits = Math.min(precision, Math.max(0, quotient.decimalPlaces()));
  return quotient.toFormat(digits);
}
