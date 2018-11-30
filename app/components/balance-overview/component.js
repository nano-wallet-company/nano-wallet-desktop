import Component from '@ember/component';

import InViewportMixin from 'ember-in-viewport';
import { keepLatestTask } from 'ember-concurrency-decorators';
import { ContextBoundTasksMixin } from 'ember-lifeline';

import { on, observes } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';

import { storage } from '../../decorators';

import getExchangeRate, {
  DEFAULT_CURRENCY,
  DEFAULT_EXCHANGE_RATE,
} from '../../utils/get-exchange-rate';

export const EXCHANGE_RATE_POLL_INTERVAL = 5 * 60 * 1000;

export default class BalanceOverviewComponent extends Component.extend(
  InViewportMixin,
  ContextBoundTasksMixin,
) {
  @storage('wallet') settings;

  @alias('settings.currency') currency;

  wallet = null;

  exchangeRate = null;

  onChangeCurrency = null;

  pollToken = null;

  @on('didEnterViewport')
  resumePolling() {
    this.pausePolling();

    const pollToken = this.pollTask('onPoll');
    this.set('pollToken', pollToken);
    return pollToken;
  }

  @on('didExitViewport', 'willDestroyElement')
  pausePolling() {
    const pollToken = this.get('pollToken');
    if (pollToken) {
      this.cancelPoll(pollToken);
      return pollToken;
    }

    return null;
  }

  @keepLatestTask
  * exchangeRateTask(currency = DEFAULT_CURRENCY) {
    return yield getExchangeRate(currency);
  }

  @observes('currency')
  async updateExchangeRate() {
    return this.runTask(async () => {
      const currency = this.get('currency');
      if (currency === DEFAULT_CURRENCY) {
        this.set('exchangeRate', DEFAULT_EXCHANGE_RATE);
        return DEFAULT_EXCHANGE_RATE;
      }

      this.set('exchangeRate', null);

      const exchangeRate = await this.get('exchangeRateTask').perform(currency);
      this.set('exchangeRate', exchangeRate);
      return exchangeRate;
    });
  }

  onPoll(next) {
    return this.runTask(async () => {
      await this.updateExchangeRate();
      return this.runTask(next, EXCHANGE_RATE_POLL_INTERVAL);
    });
  }
}
