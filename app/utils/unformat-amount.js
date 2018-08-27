import { get } from '@ember/object';

import toAmount from './to-amount';

const cache = Object.create(null);

export class Unformatter {
  referencePattern = /^9([^\d])9$/;

  unformatPattern = /\D+/g;

  decimalSeparator = '.';

  constructor(intl, options) {
    const referenceAmount = intl.formatNumber('9.9', options);
    const [, decimalSeparator] = referenceAmount.match(this.referencePattern);
    this.decimalSeparator = decimalSeparator;
  }

  unformat(value) {
    let [int, frac] = String(value).split(this.decimalSeparator, 2);
    int = int ? int.replace(this.unformatPattern, '') : '0';
    if (!frac) {
      return int;
    }

    frac = frac.replace(this.unformatPattern, '');
    return `${int}.${frac}`;
  }
}

export default function unformatAmount(intl, amount, options = {}) {
  const { locale = get(intl, 'locale') } = options;
  const cacheKey = JSON.stringify(locale);
  if (!cache[cacheKey]) {
    cache[cacheKey] = new Unformatter(intl, { locale });
  }

  const value = cache[cacheKey].unformat(amount);
  return toAmount(value);
}
