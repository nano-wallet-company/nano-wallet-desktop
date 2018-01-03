import Route from '@ember/routing/route';

import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default Route.extend({
  @service intl: null,
  @service flashMessages: null,

  @action
  async createAccount(wallet) {
    const account = await this.store.createRecord('account', { wallet }).save();
    const message = this.get('intl').t('wallets.overview.created');
    this.get('flashMessages').success(message);
    return this.transitionTo('wallets.accounts', account);
  },
});
