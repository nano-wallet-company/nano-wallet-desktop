import { helper } from '@ember/component/helper';

import BigNumber from 'npm:bignumber.js';

const base10 = BigNumber(10);

const PREFIXES = {
  Gxrb: base10.pow(33),
  Mxrb: base10.pow(30),
  kxrb: base10.pow(27),
  xrb: base10.pow(24),
  mxrb: base10.pow(21),
  uxrb: base10.pow(18),
};

export function formatAmount([value = 0], { prefix = 'Mxrb', precision = 6 }) {
  const divisor = PREFIXES[prefix] || PREFIXES.Mxrb;
  const quotient = BigNumber(value).dividedBy(divisor);
  const digits = Math.max(precision, Math.min(1, quotient.decimalPlaces()));
  return quotient.toFormat(digits);
}

export default helper(formatAmount);
