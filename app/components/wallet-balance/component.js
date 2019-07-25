import Component from '@ember/component';

import { DEFAULT_CURRENCY, DEFAULT_EXCHANGE_RATE } from '../../utils/get-exchange-rate';

export default class WalletBalanceComponent extends Component {
  amount = 0;

  currency = DEFAULT_CURRENCY;

  exchangeRate = DEFAULT_EXCHANGE_RATE;
}
