import { defineError } from 'ember-exex/error';

import coinmarketcap from 'coinmarketcap';
import BigNumber from 'bignumber.js';

export const NANO = 'NANO';
export const BTC = 'BTC';
export const USD = 'USD';
export const EUR = 'EUR';

export const CURRENCIES = new Set([NANO, BTC, USD, EUR]);

export const DEFAULT_CURRENCY = NANO;
export const DEFAULT_EXCHANGE_RATE = 1;

export const InvalidCurrencyError = defineError({
  name: 'InvalidCurrencyError',
  message: 'Invalid currency: {currency}',
  extends: TypeError,
});

export const RequestExchangeRateError = defineError({
  name: 'RequestExchangeRateError',
  message: 'Error requesting exchange rate',
});

export const InvalidExchangeRateError = defineError({
  name: 'InvalidExchangeRateError',
  message: 'Invalid exchange rate: {value}',
  extends: TypeError,
});

export default async function getExchangeRate(currency = DEFAULT_CURRENCY) {
  if (currency === DEFAULT_CURRENCY) {
    return DEFAULT_EXCHANGE_RATE;
  }

  if (!CURRENCIES.has(currency)) {
    throw new InvalidCurrencyError({ params: { currency } });
  }

  const asset = DEFAULT_CURRENCY;
  const convert = String(currency).toLowerCase();
  let ticker;
  try {
    ticker = await coinmarketcap.tickerByAsset(asset, { convert });
  } catch (err) {
    throw new RequestExchangeRateError().withPreviousError(err);
  }

  const value = ticker[`price_${convert}`];
  let exchangeRate;
  try {
    exchangeRate = BigNumber(value);
  } catch (err) {
    throw new InvalidExchangeRateError({ params: { value } }).withPreviousError(err);
  }

  return exchangeRate;
}
