import { helper } from '@ember/component/helper';

import bip39 from 'npm:bip39';

export function mnemonic([seed]/* , hash */) {
  if (typeof seed !== 'string') {
    return null;
  }

  return bip39.entropyToMnemonic(seed);
}

export default helper(mnemonic);
