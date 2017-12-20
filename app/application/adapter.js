import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';

export default DS.Adapter.extend({
  namespace: 'rpc',

  rpc: service(),
  ajax: service(),

  findRecord(store, type, id, snapshot) {
    return this.get('rpc').accountInfo(id).then((info) => {
      const data = this.serialize(snapshot, { includeId: true });
      return assign(data, info);
    });
  },

  createRecord(store, type, snapshot) {
    const data = this.serialize(snapshot, { includeId: true });
    switch (type.modelName) {
      case 'wallet':
        data.action = 'wallet_create';
        break;
      case 'account':
        data.action = 'account_create';
    }

    return this.get('ajax').post('/', {
      data,
      dataType: 'json'
    });
  }
});
