import Controller from '@ember/controller';
import { get } from '@ember/object';

import { ContextBoundTasksMixin } from 'ember-lifeline';
import { service } from 'ember-decorators/service';
import { on } from 'ember-decorators/object/evented';

const WALLET_POLL_INTERVAL = 5 * 1000; // 5s

export default Controller.extend(ContextBoundTasksMixin, {
  @service flashMessages: null,
  @service rpc: null,

  pollToken: null,

  @on('init')
  setupPoller() {
    const pollToken = this.pollTask('onPoll');
    this.set('pollToken', pollToken);
    return pollToken;
  },

  onPoll(next) {
    return this.runTask(async () => {
      const model = this.get('model');
      if (model) {
        const isNew = get(model, 'isNew');
        if (!isNew) {
          const wallet = get(model, 'id');
          await this.updateBalances(wallet);
        }
      }

      return this.runTask(next, WALLET_POLL_INTERVAL);
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

    return this.get('store').push({ data });
  },
});
