export default function isElectron() {
  return !!(typeof window !== 'undefined' && window && window.ELECTRON);
}
