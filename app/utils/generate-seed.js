import bip39 from 'npm:bip39';

export default function generateSeed() {
  const mnemonic = bip39.generateMnemonic();
  return bip39.mnemonicToSeedHex(mnemonic).slice(0, 64).toUpperCase();
}
