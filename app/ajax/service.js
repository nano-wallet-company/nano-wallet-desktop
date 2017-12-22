import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

import AjaxService from 'ember-ajax/services/ajax';
import AJAXPromise from 'ember-ajax/-private/promise';

import retryWithBackoff from 'ember-backoff/retry-with-backoff';

export default AjaxService.extend({
  hostManager: service(),

  host: readOnly('hostManager.host.rpcHost'),
  namespace: readOnly('hostManager.host.rpcNamespace'),

  contentType: 'application/json',

  request(...args) {
    return retryWithBackoff(() => this._request(...args), 10, 500);
  },

  // https://github.com/ember-cli/ember-ajax/issues/296
  _request(url, options) {
    const hash = this.options(url, options);
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

          reject(response.response);
        });
    }, `ember-ajax: ${hash.type} ${hash.url} response`);

    ajaxPromise.xhr = internalPromise.xhr;

    return ajaxPromise;
  },
});
