import DS from 'ember-data';
import { hash } from 'ember-concurrency';
import { service } from '@ember-decorators/service';

const { Adapter } = DS;

export default class WalletAdapter extends Adapter {
  @service rpc = null;

  shouldReloadRecord() {
    return true;
  }

  async findRecord(store, type, id, snapshot) {
    const rpc = this.get('rpc');
    const { wallet } = this.serialize(snapshot, { includeId: true });
    const { representative, accounts, nodeId } = await hash({
      representative: rpc.walletRepresentative(wallet),
      accounts: rpc.accountList(wallet),
      nodeId: rpc.nodeIdGet(),
    });
    return {
      wallet,
      representative,
      accounts,
      nodeId,
    };
  }

  async updateRecord(store, type, snapshot) {
    return this.serialize(snapshot, { includeId: true });
  }

  createRecord() {
    return this.get('rpc').walletCreate();
  }
}
