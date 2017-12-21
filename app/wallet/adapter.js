import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';

export default DS.Adapter.extend({
  rpc: service(),

  async findRecord(store, type, id, snapshot) {
    const rpc = this.get('rpc');
    const data = this.serialize(snapshot, { includeId: true });
    const { accounts } = await rpc.accountList(id);
    return assign(data, { accounts });
  },

  createRecord() {
    return this.get('rpc').walletCreate();
  },
});
