import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import AjaxService from 'ember-ajax/services/ajax';
import retryWithBackoff from 'ember-backoff/retry-with-backoff';

export default AjaxService.extend({
  hostManager: service(),

  host: readOnly('hostManager.host.rpcHost'),
  namespace: readOnly('hostManager.host.rpcNamespace'),

  contentType: 'application/json',

  request(...args) {
    return retryWithBackoff(() => this._super(...args));
  },
});
