import Component from '@ember/component';

import { computed } from 'ember-decorators/object';

import getExchangeRate, { DEFAULT_CURRENCY } from '../../utils/get-exchange-rate';


export default Component.extend({
  wallet: null,
  currency: Symbol.keyFor(DEFAULT_CURRENCY),

  @computed('currency')
  get exchangeRate() {
    const currency = this.get('currency');
    return getExchangeRate(Symbol.for(currency));
  },
});
