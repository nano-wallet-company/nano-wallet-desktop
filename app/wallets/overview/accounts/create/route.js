import Route from '@ember/routing/route';

import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class WalletsOverviewCreateAccountRoute extends Route {
  @service intl = null;

  @service flashMessages = null;

  @action
  async create(wallet) {
    const account = this.store.createRecord('account');
    account.set('wallet', wallet);
    await account.save();
    const message = this.get('intl').t('wallets.overview.created');
    this.get('flashMessages').success(message);
    return this.transitionTo('wallets.overview');
  }

  @action
  cancel() {
    return this.transitionTo('wallets.overview');
  }
}
