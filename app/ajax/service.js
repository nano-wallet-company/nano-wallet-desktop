import { service } from 'ember-decorators/service';
import { readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

import AjaxService from 'ember-ajax/services/ajax';
import AJAXPromise from 'ember-ajax/-private/promise';

import retryWithBackoff from 'ember-backoff/retry-with-backoff';

export default AjaxService.extend({
  @service hostManager: null,

  @readOnly
  @alias('hostManager.host.rpcHost') host: null,

  @readOnly
  @alias('hostManager.host.rpcNamespace') namespace: null,

  contentType: 'application/json',

  request(...args) {
    return retryWithBackoff(() => this.patchedRequest(...args), 10, 500);
  },

  // https://github.com/ember-cli/ember-ajax/issues/296
  patchedRequest(url, options) {
    const hash = this.options(url, options);
    // eslint-disable-next-line no-underscore-dangle
    const internalPromise = this._makeRequest(hash);

    const ajaxPromise = new AJAXPromise((resolve, reject) => {
      internalPromise
        .then(({ response }) => {
          resolve(response);
        })
        .catch(({ response }) => {
          if (response instanceof Error) {
            return reject(response);
          }

          return reject(response.response);
        });
    }, `ember-ajax: ${hash.type} ${hash.url} response`);

    ajaxPromise.xhr = internalPromise.xhr;

    return ajaxPromise;
  },
});
