import DS from 'ember-data';

import { service } from 'ember-decorators/service';

export default DS.Adapter.extend({
  @service rpc: null,

  shouldReloadRecord() {
    return true;
  },

  async findRecord(store, type, id, snapshot) {
    const rpc = this.get('rpc');
    const { wallet } = this.serialize(snapshot, { includeId: true });
    const { accounts } = await rpc.accountList(id);
    return { wallet, accounts };
  },

  createRecord() {
    return this.get('rpc').walletCreate();
  },
});
