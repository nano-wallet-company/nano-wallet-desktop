import { get } from '@ember/object';

import AjaxService from 'ember-ajax/services/ajax';

import { service } from 'ember-decorators/service';
import { computed, readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

import { task } from 'ember-concurrency';

import retryWithBackoff from 'ember-backoff/retry-with-backoff';

export default AjaxService.extend({
  @service session: null,
  @service electron: null,
  @service hostManager: null,

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

  requestTask: task(function* requestTask(fn, ...args) {
    const promise = fn.apply(this, args);
    try {
      return yield promise;
    } finally {
      promise.xhr.abort();
    }
  }).enqueue().maxConcurrency(10),

  request(...args) {
    const originalFn = this._super;
    return retryWithBackoff(() => { // eslint-disable-line arrow-body-style
      return this.get('requestTask').perform(originalFn, ...args);
    }, 10, 250);
  },
});
