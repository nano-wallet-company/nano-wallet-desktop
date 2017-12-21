import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default DS.Adapter.extend({
  rpc: service(),

  createRecord(store, type, snapshot) {
    const {
      wallet,
      source,
      destination,
      amount,
    } = this.serialize(snapshot, { includeId: true });

    return this.get('rpc').send(wallet, source, destination, amount);
  },
});
