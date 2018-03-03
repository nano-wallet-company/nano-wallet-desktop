import fromAmount from './from-amount';

import { DEFAULT_UNIT } from './get-conversion';

export default function fromRaw(value, { unit = DEFAULT_UNIT, precision = 6 } = {}) {
  const amount = fromAmount(value, { unit });
  const digits = Math.min(precision, Math.max(0, amount.decimalPlaces()));
  return amount.toFormat(digits);
}
