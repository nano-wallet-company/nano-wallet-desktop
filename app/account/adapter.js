import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';

export default DS.Adapter.extend({
  rpc: service(),

  async findRecord(store, type, id, snapshot) {
    const info = await this.get('rpc').accountInfo(id);
    const data = this.serialize(snapshot, { includeId: true });
    return assign(data, info);
  },

  createRecord(store, type, snapshot) {
    const { wallet } = this.serialize(snapshot, { includeId: true });
    return this.get('rpc').accountCreate(wallet);
  },
});
