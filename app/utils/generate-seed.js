import bip39 from 'npm:bip39';

export default function generateSeed() {
  const mnemonic = bip39.generateMnemonic(256);
  return bip39.mnemonicToEntropy(mnemonic).toUpperCase();
}
