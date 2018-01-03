import DS from 'ember-data';
import { assign } from '@ember/polyfills';

import { service } from 'ember-decorators/service';

export default DS.Adapter.extend({
  @service rpc: null,

  shouldReloadRecord() {
    return true;
  },

  async findRecord(store, type, id, snapshot) {
    const info = await this.get('rpc').accountInfo(id);
    const data = this.serialize(snapshot, { includeId: true });
    return assign(data, info);
  },

  async createRecord(store, type, snapshot) {
    const { wallet } = this.serialize(snapshot, { includeId: true });
    const { account } = await this.get('rpc').accountCreate(wallet);
    return this.get('rpc').accountInfo(account);
  },
});
