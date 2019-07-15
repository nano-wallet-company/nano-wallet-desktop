import DS from 'ember-data';

import { hash } from 'ember-concurrency';
import { inject as service } from '@ember/service';

const { Adapter } = DS;

export default class WalletAdapter extends Adapter {
  @service rpc;

  shouldReloadRecord() {
    return true;
  }

  async findRecord(store, type, id, snapshot) {
    const rpc = this.get('rpc');
    const { wallet } = this.serialize(snapshot, { includeId: true });
    const { representative, accounts } = await hash({
      representative: rpc.walletRepresentative(wallet),
      accounts: rpc.accountList(wallet),
    });

    return { wallet, representative, accounts };
  }

  async updateRecord(store, type, snapshot) {
    const data = this.serialize(snapshot, { includeId: true });
    const { representative: [, representative] = [] } = snapshot.changedAttributes();
    if (representative) {
      const { wallet } = data;
      await this.get('rpc').walletRepresentativeSet(wallet, representative, true);
    }

    return data;
  }

  createRecord() {
    return this.get('rpc').walletCreate();
  }
}
