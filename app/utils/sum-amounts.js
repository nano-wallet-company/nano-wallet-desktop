import { A } from '@ember/array';
import { isPresent } from '@ember/utils';

import BigNumber from 'bignumber.js';

export default function sumAmounts(amounts, defaultValue = 0) {
  const values = A(amounts).filter(isPresent);
  return BigNumber.sum(defaultValue, ...values);
}
