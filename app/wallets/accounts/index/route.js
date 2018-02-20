import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

import fromAmount from '../../../utils/from-amount';

export default Route.extend({
  @service intl: null,
  @service flashMessages: null,

  afterModel() {
    return this.modelFor('wallets').reload();
  },

  @action
  async deleteAccount(account) {
    const balance = get(account, 'balance');
    if (fromAmount(balance).gt(0)) {
      const message = this.get('intl').t('wallets.accounts.cannotDelete');
      this.get('flashMessages').danger(message, { sticky: true });
      return false;
    }

    await account.destroyRecord();
    return this.transitionTo('wallets.overview');
  },
});

