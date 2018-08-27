import { get } from '@ember/object';
import { typeOf } from '@ember/utils';

import BigNumber from 'npm:bignumber.js';

import formats from '../formats';

import getConversion, { DEFAULT_UNIT } from './get-conversion';
import {
  DEFAULT_CURRENCY,
  DEFAULT_EXCHANGE_RATE,
} from './get-exchange-rate';

const currencyFormats = formats.number || {};

export default function formatAmount(intl, value, options = {}) {
  const {
    locale = get(intl, 'locale'),
    useGrouping = true,
    unit = Symbol.keyFor(DEFAULT_UNIT),
    currency = Symbol.keyFor(DEFAULT_CURRENCY),
    exchangeRate = DEFAULT_EXCHANGE_RATE,
  } = options;

  const valueType = typeOf(value);
  if (!(value instanceof BigNumber) && (valueType !== 'string' && valueType !== 'number')) {
    return '0';
  }

  const divisor = getConversion(Symbol.for(unit));
  const quotient = BigNumber(value).dividedBy(divisor);
  const product = BigNumber(quotient).times(exchangeRate);
  const decimalPlaces = product.decimalPlaces();

  let { maximumFractionDigits } = currencyFormats[currency] || {};
  if (!maximumFractionDigits) {
    maximumFractionDigits = Math.min(20, Math.max(0, decimalPlaces));
  }

  let { minimumIntegerDigits } = currencyFormats[currency] || {};
  if (!minimumIntegerDigits) {
    minimumIntegerDigits = Math.min(21, Math.max(1, product.precision(true) - decimalPlaces));
  }

  const amount = intl.formatNumber(product, {
    locale,
    useGrouping,
    minimumIntegerDigits,
    maximumFractionDigits,
  });

  return amount;
}
