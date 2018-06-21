import Component from '@ember/component';

import {
  DEFAULT_CURRENCY,
  DEFAULT_EXCHANGE_RATE,
} from '../../utils/get-exchange-rate';

export default Component.extend({
  amount: 0,
  currency: Symbol.keyFor(DEFAULT_CURRENCY),
  exchangeRate: DEFAULT_EXCHANGE_RATE,
});
