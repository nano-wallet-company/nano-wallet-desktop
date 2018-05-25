import Component from '@ember/component';

import InViewportMixin from 'ember-in-viewport';
import { storageFor } from 'ember-local-storage';
import {
  runTask,
  runDisposables,
  pollTask,
  cancelPoll,
} from 'ember-lifeline';
import { task } from 'ember-concurrency';

import { observes } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';
import { on } from 'ember-decorators/object/evented';

import getExchangeRate, { DEFAULT_CURRENCY, DEFAULT_EXCHANGE_RATE } from '../../utils/get-exchange-rate';

export const EXCHANGE_RATE_POLL_INTERVAL = 5 * 60 * 1000;

export default Component.extend(InViewportMixin, {
  settings: storageFor('settings', 'wallet'),

  @alias('settings.currency') currency: null,

  wallet: null,
  exchangeRate: null,

  onChangeCurrency: null,

  pollToken: null,

  willDestroy(...args) {
    runDisposables(this);
    return this._super(...args);
  },

  @on('didEnterViewport')
  resumePolling() {
    this.pausePolling();

    const pollToken = pollTask(this, 'onPoll');
    this.set('pollToken', pollToken);
    return pollToken;
  },

  @on('didExitViewport', 'willDestroyElement')
  pausePolling() {
    const pollToken = this.get('pollToken');
    if (pollToken) {
      cancelPoll(pollToken);
      return pollToken;
    }

    return null;
  },

  exchangeRateTask: task(function* exchangeRateTask(currency = Symbol.keyFor(DEFAULT_CURRENCY)) {
    return yield getExchangeRate(Symbol.for(currency));
  }).keepLatest(),

  @observes('currency')
  async updateExchangeRate() {
    return runTask(this, async () => {
      const currency = this.get('currency');
      if (currency === Symbol.keyFor(DEFAULT_CURRENCY)) {
        this.set('exchangeRate', DEFAULT_EXCHANGE_RATE);
        return DEFAULT_EXCHANGE_RATE;
      }

      this.set('exchangeRate', null);

      const exchangeRate = await this.get('exchangeRateTask').perform(currency);
      this.set('exchangeRate', exchangeRate);
      return exchangeRate;
    });
  },

  onPoll(next) {
    return runTask(this, async () => {
      await this.updateExchangeRate();
      return runTask(this, next, EXCHANGE_RATE_POLL_INTERVAL);
    });
  },
});
