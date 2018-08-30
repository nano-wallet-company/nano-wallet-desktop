import Component from '@ember/component';

import { argument } from '@ember-decorators/argument';

import {
  DEFAULT_CURRENCY,
  DEFAULT_EXCHANGE_RATE,
} from '../../utils/get-exchange-rate';

export default class WalletBalanceComponent extends Component {
  @argument amount = 0;

  @argument currency = Symbol.keyFor(DEFAULT_CURRENCY);

  @argument exchangeRate = DEFAULT_EXCHANGE_RATE;
}
