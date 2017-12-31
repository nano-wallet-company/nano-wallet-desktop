import { helper } from '@ember/component/helper';

import fromRaw from '../utils/from-raw';

export function formatAmount([value = 0], hash) {
  return fromRaw(value, hash);
}

export default helper(formatAmount);
