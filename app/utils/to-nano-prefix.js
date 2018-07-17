export default function toNanoPrefix(value) {
  return String(value).replace(/^xrb/, 'nano');
}
