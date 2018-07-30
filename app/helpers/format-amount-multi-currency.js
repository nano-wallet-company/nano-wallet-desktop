import Helper from '@ember/component/helper';
import { typeOf } from '@ember/utils';

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
    const { currency } = params;
    const unit = Symbol.keyFor(DEFAULT_UNIT);

    const { decimals, rate } = currency;

    const valueType = typeOf(value);
    if (!(value instanceof BigNumber) && (valueType !== 'string' && valueType !== 'number')) {
      return 0;
    }

    const divisor = getConversion(Symbol.for(unit));
    const quotient = BigNumber(value).dividedBy(divisor);
    const product = BigNumber(quotient).times(rate);

    const maximumFractionDigits = decimals || 2;

    const amount = this.get('intl').formatNumber(product, {
      maximumFractionDigits,
    });

    return this.get('intl').t('currency', { amount });
  },
});
