import DS from 'ember-data';
import { inject as service } from '@ember/service';

const { Adapter } = DS;

export default class BlockAdapter extends Adapter {
  @service rpc;

  shouldReloadRecord() {
    return true;
  }

  async findRecord(store, type, id, snapshot) {
    const contents = await this.get('rpc').block(id);
    const { block } = this.serialize(snapshot, { includeId: true });
    return Object.assign({}, contents, { block });
  }

  createRecord(store, type, snapshot) {
    const { wallet, source, destination, amount } = this.serialize(snapshot, { includeId: true });

    return this.get('rpc').send(wallet, source, destination, amount);
  }
}
