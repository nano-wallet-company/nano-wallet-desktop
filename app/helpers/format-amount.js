import Helper from '@ember/component/helper';

import { service } from 'ember-decorators/service';
import { observes } from 'ember-decorators/object';

import BigNumber from 'npm:bignumber.js';

import getConversion from '../utils/get-conversion';

export default Helper.extend({
  @service intl: null,

  @observes('intl.locale')
  onLocaleChange() {
    this.recompute();
  },

  compute([value = 0], { unit = 'Mxrb', precision = 6 } = {}) {
    const divisor = getConversion(unit);
    const quotient = BigNumber(value).dividedBy(divisor);
    const maximumFractionDigits = Math.min(precision, Math.max(2, quotient.decimalPlaces()));
    return this.get('intl').formatNumber(quotient, {
      maximumFractionDigits,
      style: 'currency',
      currency: 'XRB',
      currencyDisplay: 'name',
    });
  },
});
