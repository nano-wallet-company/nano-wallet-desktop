import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  namespace: '/rpc',
  contentType: 'application/json; charset=utf-8'
});
