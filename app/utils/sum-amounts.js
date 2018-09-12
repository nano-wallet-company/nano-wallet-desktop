import { A } from '@ember/array';
import { isPresent } from '@ember/utils';

import BigNumber from 'npm:bignumber.js';

export default function sumAmounts(amounts, defaultValue = 0) {
  return A(amounts)
    .filter(isPresent)
    .map(x => new BigNumber(String(x)))
    .reduce((x, y) => y.plus(x), defaultValue);
}
