import DS from 'ember-data';
import { service } from '@ember-decorators/service';

const { Adapter } = DS;

export default class BlockAdapter extends Adapter {
  @service rpc = null;

  shouldReloadRecord() {
    return true;
  }

  createRecord(store, type, snapshot) {
    const {
      wallet,
      source,
      destination,
      amount,
    } = this.serialize(snapshot, { includeId: true });

    return this.get('rpc').send(wallet, source, destination, amount);
  }
}
