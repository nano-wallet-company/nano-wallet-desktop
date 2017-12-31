import DS from 'ember-data';

import { all } from 'rsvp';
import { service } from 'ember-decorators/service';

export default DS.Adapter.extend({
  @service rpc: null,

  async findRecord(store, type, id, snapshot) {
    const rpc = this.get('rpc');
    const { wallet } = this.serialize(snapshot, { includeId: true });
    const [
      { balance, pending },
      { accounts },
    ] = await all([
      rpc.walletBalanceTotal(id),
      rpc.accountList(id),
    ]);

    return {
      wallet,
      balance,
      pending,
      accounts,
    };
  },

  createRecord() {
    return this.get('rpc').walletCreate();
  },

  async updateRecord(store, type, snapshot) {
    const rpc = this.get('rpc');
    const { wallet, seed } = this.serialize(snapshot, { includeId: true });
    await rpc.walletChangeSeed(wallet, seed);
  },
});
