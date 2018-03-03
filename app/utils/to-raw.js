import toAmount from './to-amount';

import { DEFAULT_UNIT } from './get-conversion';

export default function toRaw(value, { unit = DEFAULT_UNIT } = {}) {
  return toAmount(value, { unit }).toFixed(0);
}
