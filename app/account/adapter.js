import DS from 'ember-data';

import { inject as service } from '@ember/service';

const { Adapter } = DS;

export default class AccountAdapter extends Adapter {
  @service rpc;

  shouldReloadRecord() {
    return true;
  }

  async findRecord(store, type, id, snapshot) {
    const info = await this.get('rpc').accountInfo(id);
    const { account } = this.serialize(snapshot, { includeId: true });
    return Object.assign({}, info, { account });
  }

  async createRecord(store, type, snapshot) {
    const { wallet } = this.serialize(snapshot);
    const { account } = await this.get('rpc').accountCreate(wallet);
    return { account, wallet };
  }

  async updateRecord(store, type, snapshot) {
    const data = this.serialize(snapshot, { includeId: true });
    const { representative: [, representative] = [] } = snapshot.changedAttributes();
    if (representative) {
      const { wallet, account } = data;
      await this.get('rpc').accountRepresentativeSet(wallet, account, representative);
    }

    return data;
  }

  async deleteRecord(store, type, snapshot) {
    const { wallet, account } = this.serialize(snapshot, { includeId: true });
    await this.get('rpc').accountRemove(wallet, account);
    return null;
  }
}
