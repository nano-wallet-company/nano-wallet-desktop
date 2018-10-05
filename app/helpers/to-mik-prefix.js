import { helper } from '@ember/component/helper';

import toMikPrefix from '../utils/to-mik-prefix';

export function mikPrefixHelper([value]) {
  return toMikPrefix(value);
}

export default helper(mikPrefixHelper);
