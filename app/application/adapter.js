import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default DS.Adapter.extend({
  namespace: 'rpc',

  ajax: service(),

  findRecord(store, type, id, snapshot) {
    // return new RSVP.Promise((resolve, reject) => {
    //   $.getJSON(`/${type.modelName}/${id}`).then(function(data) {
    //     resolve(data);
    //   }, function(jqXHR) {
    //     reject(jqXHR);
    //   });
    // });

    return this.get('ajax').request('/', {
      method: 'POST',
      dataType: 'json',
      data: {
        action: 'account_balance',
        account: id
      }
    }).then((data) => {
      const attrs = data;
      attrs.id = id;
      return attrs;
    });
  }
});
