import AjaxService from 'ember-ajax/services/ajax';

import { service } from 'ember-decorators/service';
import { readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

import { task } from 'ember-concurrency';

import retryWithBackoff from 'ember-backoff/retry-with-backoff';

export default AjaxService.extend({
  @service session: null,
  @service hostManager: null,

  @readOnly
  @alias('hostManager.host.rpcHost') host: null,

  @readOnly
  @alias('hostManager.host.rpcNamespace') namespace: null,

  contentType: 'application/json',

  // @computed('session.data.authenticated.wallet')
  // get headers() {
  //   const headers = {};
  //   const wallet = this.get('session.data.authenticated.wallet');
  //   if (wallet) {
  //     headers.Authorization = `Bearer ${wallet}`;
  //   }
  //   return headers;
  // },

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
