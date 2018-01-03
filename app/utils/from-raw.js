import fromAmount from './from-amount';

export default function fromRaw(value, { unit = 'Mxrb', precision = 6 } = {}) {
  const amount = fromAmount(value, { unit });
  const digits = Math.min(precision, Math.max(0, amount.decimalPlaces()));
  return amount.toFormat(digits);
}
