import Helper from '@ember/component/helper';
import { typeOf } from '@ember/utils';

import { service } from 'ember-decorators/service';
import { observes } from 'ember-decorators/object';

import BigNumber from 'npm:bignumber.js';

import formats from '../formats';

import getConversion, { DEFAULT_UNIT } from '../utils/get-conversion';
import {
  DEFAULT_CURRENCY,
  DEFAULT_EXCHANGE_RATE,
} from '../utils/get-exchange-rate';

const currencyFormats = formats.number || {};

export default Helper.extend({
  @service intl: null,

  @observes('intl.locale')
  onLocaleChange() {
    this.recompute();
  },

  compute([value = 0], params = {}) {
    const {
      useGrouping = true,
      unit = Symbol.keyFor(DEFAULT_UNIT),
      currency = Symbol.keyFor(DEFAULT_CURRENCY),
      exchangeRate = DEFAULT_EXCHANGE_RATE,
    } = params;

    const valueType = typeOf(value);
    if (!(value instanceof BigNumber) && (valueType !== 'string' && valueType !== 'number')) {
      return 0;
    }

    const divisor = getConversion(Symbol.for(unit));
    const quotient = BigNumber(value).dividedBy(divisor);
    const product = BigNumber(quotient).times(exchangeRate);
    const decimalPlaces = product.decimalPlaces();

    let { maximumFractionDigits } = currencyFormats[currency] || {};
    if (!maximumFractionDigits) {
      maximumFractionDigits = Math.min(20, decimalPlaces);
    }

    let { minimumIntegerDigits } = currencyFormats[currency] || {};
    if (!minimumIntegerDigits) {
      minimumIntegerDigits = Math.max(1, Math.min(21, product.precision(true) - decimalPlaces));
    }

    const amount = this.get('intl').formatNumber(product, {
      useGrouping,
      minimumIntegerDigits,
      maximumFractionDigits,
    });

    return this.get('intl').t('currency', { amount });
  },
});
