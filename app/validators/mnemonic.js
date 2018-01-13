import bip39 from 'npm:bip39';

export default function validateMnemonic(/* options = {} */) {
  return (key, newValue) => bip39.validateMnemonic(newValue) || 'Invalid mnemonic';
}
