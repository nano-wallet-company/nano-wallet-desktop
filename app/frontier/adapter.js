import DS from 'ember-data';

import { inject as service } from '@ember/service';

const { Adapter } = DS;

export default class FrontierAdapter extends Adapter {
  @service rpc;

  async query(store, type, { wallet }) {
    const frontiers = await this.get('rpc').walletFrontiers(wallet);
    return Object.entries(frontiers).map(([account, hash]) => ({
      wallet,
      account,
      hash,
    }));
  }
}
