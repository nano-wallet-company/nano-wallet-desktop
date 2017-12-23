import { helper } from '@ember/component/helper';

import formatAmountUtil from '../utils/format-amount';

export function formatAmount([value], hash) {
  return formatAmountUtil(value, hash);
}

export default helper(formatAmount);
