import DS from 'ember-data';
import { inject as service } from '@ember/service';

import { resolve } from 'rsvp';

export default DS.Adapter.extend({
  rpc: service(),

  // async findRecord(store, type, id, snapshot) {
  //   const info = await this.get('rpc').accountInfo(id);
  //   const data = this.serialize(snapshot, { includeId: true });
  //   return assign(data, info);
  // },

  // async createRecord(store, type, snapshot) {
  //   const { wallet } = this.serialize(snapshot, { includeId: true });
  //   const { account } = await this.get('rpc').accountCreate(wallet);
  //   return this.get('rpc').accountInfo(account);
  // },

  query(store, type, { account, count = 10 }) {
    return this.get('rpc').accountHistory(account, count);
  },
});
