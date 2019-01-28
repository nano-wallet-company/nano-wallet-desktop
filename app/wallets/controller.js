import Controller from '@ember/controller';
import { get } from '@ember/object';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';

import { ContextBoundTasksMixin } from 'ember-lifeline';
import { inject as service } from '@ember-decorators/service';

const WALLET_POLL_INTERVAL = 5 * 1000; // 5s

export default class WalletsController extends Controller.extend(
  ContextBoundTasksMixin,
) {
  @service flashMessages;

  @service rpc;

  pollToken = null;

  constructor(...args) {
    super(...args);

    const pollToken = this.pollTask('onPoll');
    this.set('pollToken', pollToken);
  }

  onPoll(next) {
    return this.runTask(async () => {
      const wallet = this.get('model');
      if (wallet) {
        const isNew = get(wallet, 'isNew');
        if (!isNew) {
          await this.updateBalances(wallet);
        }
      }

      return this.runTask(next, WALLET_POLL_INTERVAL);
    });
  }

  async updateBalances(wallet) {
    const rpc = this.get('rpc');
    await rpc.searchPending(get(wallet, 'id'));

    const accounts = A(get(wallet, 'accounts')).map(acc => get(acc, 'id'));
    if (!isEmpty(accounts)) {
      const balances = await rpc.accountsBalances(accounts);
      const data = Object.entries(balances).map(([id, attributes]) => ({
        id,
        attributes,
        type: 'account',
      }));

      this.get('store').push({ data });
    }
  }
}
