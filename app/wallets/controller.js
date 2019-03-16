import Controller from '@ember/controller';
import { get, set } from '@ember/object';

import { ContextBoundTasksMixin } from 'ember-lifeline';
import { service } from '@ember-decorators/service';
import { tryInvoke } from '@ember/utils';
import { storage } from '../decorators';
import fromAmount from '../utils/from-amount';

const WALLET_POLL_INTERVAL = 5 * 1000; // 5s

export default class WalletsController extends Controller.extend(
  ContextBoundTasksMixin,
) {
  @service flashMessages = null;

  @service rpc = null;

  @storage('account') settings = null;

  account = null;

  pollToken = null;

  constructor(...args) {
    super(...args);

    const pollToken = this.pollTask('onPoll');
    this.set('pollToken', pollToken);
  }

  onPoll(next) {
    return this.runTask(async () => {
      const model = this.get('model');
      if (model) {
        const isNew = get(model, 'isNew');
        if (!isNew) {
          const wallet = get(model, 'id');
          await this.updateBalances(wallet);
        }
        const accounts = get(model, 'accounts');
        accounts.forEach((account) => {
          this.set('account', account);
          const settings = this.get('settings');
          const isHidden = get(settings, 'hidden');
          const balance = get(this.account, 'balance');
          if (isHidden && fromAmount(balance).gt(0)) {
            const hidden = false;
            tryInvoke(settings, 'setProperties', [{ hidden }]);
            set(account, 'visible', true);
            window.location.href = '/';
          }
        });
      }

      return this.runTask(next, WALLET_POLL_INTERVAL);
    });
  }

  async updateBalances(wallet) {
    await this.get('rpc').searchPending(wallet);

    const balances = await this.get('rpc').walletBalances(wallet);
    const data = Object.entries(balances).map(([id, attributes]) => ({
      id,
      attributes,
      type: 'account',
    }));

    return this.get('store').push({ data });
  }
}
