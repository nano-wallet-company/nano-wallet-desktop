import toAmount from './to-amount';

export default function toRaw(value, { unit = 'Mxrb' } = {}) {
  return toAmount(value, { unit }).toFixed(0);
}
