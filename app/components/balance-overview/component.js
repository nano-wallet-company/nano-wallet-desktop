import Component from '@ember/component';

import InViewportMixin from 'ember-in-viewport';
import { ContextBoundTasksMixin } from 'ember-lifeline';
import { storageFor } from 'ember-local-storage';
import { task } from 'ember-concurrency';

import { alias } from 'ember-decorators/object/computed';
import { on } from 'ember-decorators/object/evented';
import { tryInvoke } from '@ember/utils';

import getExchangeRate from '../../utils/get-exchange-rate';

export const EXCHANGE_RATE_POLL_INTERVAL = 5 * 60 * 1000; // 300 seconds / 5 minutes

export default Component.extend(InViewportMixin, ContextBoundTasksMixin, {
  settings: storageFor('settings', 'wallet'),

  @alias('settings.currencies') currencies: null,

  wallet: null,
  exchangeRate: null,

  onChangeCurrency: null,

  pollToken: null,

  @on('didEnterViewport')
  resumePolling() {
    this.pausePolling();

    const pollToken = this.pollTask('onPoll');
    this.set('pollToken', pollToken);
    return pollToken;
  },

  @on('didExitViewport', 'willDestroyElement')
  pausePolling() {
    const pollToken = this.get('pollToken');
    if (pollToken) {
      this.cancelPoll(pollToken);
      return pollToken;
    }

    return null;
  },

  exchangeRateTask: task(
    function* exchangeRateTask(currencyCode) {
      return yield getExchangeRate(Symbol.for(currencyCode));
    },
  ).keepLatest(),

  async updateExchangeRates() {
    return this.runTask(async () => {
      const settings = this.get('settings');
      const currencies = this.get('currencies');
      const updatedRates = [];

      for (let i = 0; i < currencies.length; i += 1) {
        const currencyCode = currencies[i].code;
        const item = currencies[i];
        /* eslint-disable-next-line */
        item.rate = await this.get('exchangeRateTask').perform(currencyCode);
        updatedRates.push(item);
      }
      await tryInvoke(settings, 'setProperties', [{ currencies: updatedRates }]);
    });
  },

  onPoll(next) {
    return this.runTask(async () => {
      await this.updateExchangeRates();
      return this.runTask(next, EXCHANGE_RATE_POLL_INTERVAL);
    });
  },
});
