import DS from 'ember-data';

import { service } from '@ember-decorators/service';

const { Adapter } = DS;

export default class AccountAdapter extends Adapter {
  @service rpc = null;

  shouldReloadRecord() {
    return true;
  }

  async findRecord(store, type, id) {
    const info = await this.get('rpc').accountInfo(id);
    info.account = id;
    return info;
  }

  async createRecord(store, type, snapshot) {
    const { wallet } = this.serialize(snapshot);
    const { account } = await this.get('rpc').accountCreate(wallet);
    return { account, wallet };
  }

  async updateRecord(store, type, snapshot) {
    const { wallet, account } = this.serialize(snapshot, { includeId: true });

    const { comment: [, publicLabel] = [] } = snapshot.changedAttributes();
    if (publicLabel) {
      // may throw
      await this.get('rpc').addCommentAccount(wallet, account, publicLabel);
    }

    const { representative: [, representative] = [] } = snapshot.changedAttributes();
    if (representative) {
      // may throw
      await this.get('rpc').accountRepresentativeSet(wallet, account, representative);
    }

    return { account, wallet };
  }

  async deleteRecord(store, type, snapshot) {
    const { wallet, account } = this.serialize(snapshot, { includeId: true });
    await this.get('rpc').accountRemove(wallet, account);
    return null;
  }
}
