import AjaxService from 'ember-ajax/services/ajax';
import retryWithBackoff from 'ember-backoff/retry-with-backoff';

export default AjaxService.extend({
  // namespace: '/rpc',
  host: 'http://localhost:55000',
  contentType: 'application/json; charset=utf-8',

  request(...args) {
    return retryWithBackoff(() => this._super(...args));
  }
});
