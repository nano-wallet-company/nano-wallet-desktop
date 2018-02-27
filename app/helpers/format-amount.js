import Helper from '@ember/component/helper';

import { service } from 'ember-decorators/service';
import { observes } from 'ember-decorators/object';

import BigNumber from 'npm:bignumber.js';

import getConversion, { DEFAULT_UNIT } from '../utils/get-conversion';

export default Helper.extend({
  @service intl: null,

  @observes('intl.locale')
  onLocaleChange() {
    this.recompute();
  },

  compute([value = 0], params = {}) {
    const {
      unit = Symbol.keyFor(DEFAULT_UNIT),
      exchangeRate = 1,
      precision = 6,
    } = params;
    const divisor = getConversion(Symbol.for(unit));
    const quotient = BigNumber(value).dividedBy(divisor);
    const product = BigNumber(quotient).times(exchangeRate);
    const decimalPlaces = product.decimalPlaces();
    const maximumFractionDigits = Math.max(0, Math.min(20, precision, decimalPlaces));
    const minimumIntegerDigits = Math.max(1, Math.min(21, product.precision(true) - decimalPlaces));
    const amount = this.get('intl').formatNumber(product, {
      minimumIntegerDigits,
      maximumFractionDigits,
    });
    return this.get('intl').t('currency', { amount });
  },
});
