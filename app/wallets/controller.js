import Controller from '@ember/controller';
import { get } from '@ember/object';

import { runTask, runDisposables } from 'ember-lifeline';
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
    const poller = this.get('poller');
    if (poller) {
      this.get('pollboy').remove(poller);
    }

    runDisposables(this);
    return this._super(...args);
  },

  async onPoll() {
    return runTask(this, () => {
      const model = this.get('model');
      if (model) {
        const isNew = get(model, 'isNew');
        if (!isNew) {
          const wallet = get(model, 'id');
          return this.updateBalances(wallet);
        }
      }

      return true;
    });
  },

  async updateBalances(wallet) {
    await this.get('rpc').searchPending(wallet);

    const balances = await this.get('rpc').walletBalances(wallet);
    const data = Object.entries(balances).map(([id, attributes]) => ({
      id,
      attributes,
      type: 'account',
    }));

    return this.store.push({ data });
  },
});
