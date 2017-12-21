import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';

import { all } from 'rsvp';

export default DS.Adapter.extend({
  rpc: service(),

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
    }
  },

  createRecord() {
    return this.get('rpc').walletCreate();
  },
});
