import Route from '@ember/routing/route';

import { tryInvoke } from '@ember/utils';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';
import { storage } from '../../../../decorators';

export default class WalletsOverviewAccountsSettingsRoute extends Route {
  @service intl = null;

  @service flashMessages = null;

  @storage('account') settings = null;

  account = null;

  @action
  save() {
    const message = this.get('intl').t('accountSettingsSaved');
    this.get('flashMessages').success(message);
    return this.transitionTo('wallets.overview');
  }

  @action
  hideAccount(account) {
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
