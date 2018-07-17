import { helper } from '@ember/component/helper';

import toNanoPrefix from '../utils/to-nano-prefix';

export function nanoPrefixHelper([value]) {
  return toNanoPrefix(value);
}

export default helper(nanoPrefixHelper);
