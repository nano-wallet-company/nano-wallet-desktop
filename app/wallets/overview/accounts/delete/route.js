import Route from '@ember/routing/route';

import { tryInvoke } from '@ember/utils';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';
import { storage } from '../../../../decorators';

export default class WalletsOverviewDeleteAccountRoute extends Route {
  @service intl = null;

  @service flashMessages = null;

  @storage('account') settings = null;

  @action
  async deleteAccount(account) {
    this.set('account', account);
    const settings = this.get('settings');
    const hidden = true;
    tryInvoke(settings, 'setProperties', [{ hidden }]);
    window.location.href = '/';
  }

  @action
  cancel() {
    return this.transitionTo('wallets.overview');
  }
}
