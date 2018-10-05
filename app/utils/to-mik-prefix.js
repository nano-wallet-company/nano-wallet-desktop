export default function toMikPrefix(value = '') {
  return String(value).replace(/^xrb/, 'mik');
}
