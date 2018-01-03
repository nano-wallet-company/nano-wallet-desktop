import DS from 'ember-data';

import { all } from 'rsvp';
import { service } from 'ember-decorators/service';

export default DS.Adapter.extend({
  @service rpc: null,

  shouldReloadRecord() {
    return true;
  },

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

  async createRecord(store, type, snapshot) {
    const data = await this.get('rpc').walletCreate();

    const seed = snapshot.attr('seed');
    if (seed) {
      const { wallet } = data;
      const rpc = this.get('rpc');
      await rpc.walletChangeSeed(wallet, seed);
    }

    return data;
  },

  async updateRecord(store, type, snapshot) {
    const rpc = this.get('rpc');
    const { wallet, seed } = this.serialize(snapshot, { includeId: true });
    await rpc.walletChangeSeed(wallet, seed);
  },
});
