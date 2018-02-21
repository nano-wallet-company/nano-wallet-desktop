import Controller from '@ember/controller';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';
import { on } from 'ember-decorators/object/evented';

const WALLET_POLL_INTERVAL = 5000; // 5s

export default Controller.extend({
  @service pollboy: null,
  @service flashMessages: null,
  @service rpc: null,

  poller: null,

  @on('init')
  setupPoller() {
    const pollboy = this.get('pollboy');
    this.poller = pollboy.add(this, this.onPoll, WALLET_POLL_INTERVAL);
    this.poller.pause();
  },

  willDestroy(...args) {
    this._super(...args);

    const poller = this.get('poller');
    if (poller) {
      this.get('pollboy').remove(poller);
    }
  },

  async onPoll() {
    if (!this.isDestroying) {
      const model = this.get('model');
      if (model) {
        const isNew = get(model, 'isNew');
        if (!isNew) {
          const wallet = get(model, 'id');
          this.updateBalances(wallet);
        }
      }
    }
  },

  async updateBalances(wallet) {
    const balances = await this.get('rpc').walletBalances(wallet);
    const data = Object.entries(balances).map(([id, attributes]) => ({
      id,
      attributes,
      type: 'account',
    }));

    this.store.push({ data });
  },
});
