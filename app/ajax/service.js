import AjaxService from 'ember-ajax/services/ajax';
import { get } from '@ember/object';

import { task } from 'ember-concurrency';
import { retryable, ExponentialBackoffPolicy } from 'ember-concurrency-retryable';
import { defineError } from 'ember-exex/error';

import { service } from 'ember-decorators/service';
import { computed, readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

export const AjaxError = defineError({
  name: 'AjaxError',
  message: 'AJAX error',
});

export const backoffPolicy = new ExponentialBackoffPolicy({
  minDelay: 100,
  maxDelay: 10 * 1000, // 10s
  reasons: [AjaxError],
});

export default AjaxService.extend({
  @service session: null,
  @service hostManager: null,
  @service electron: null,

  @readOnly
  @alias('hostManager.host.rpcHost') host: null,

  @readOnly
  @alias('hostManager.host.rpcNamespace') namespace: null,

  contentType: 'application/json',

  @computed('electron.isElectron')
  get headers() {
    const headers = {};
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const token = electron.authorizationToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  },

  requestTask: retryable(task(function* requestTask(fn) {
    const promise = fn.call(this);
    try {
      return yield promise;
    } catch (err) {
      throw new AjaxError().withPreviousError(err);
    } finally {
      promise.xhr.abort();
    }
  }), backoffPolicy).enqueue().maxConcurrency(20),

  request(...args) {
    const fn = this._super.bind(this, ...args);
    return this.get('requestTask').perform(fn);
  },
});
