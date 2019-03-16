import Route from '@ember/routing/route';

import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class WalletsOverviewAccountsSettingsRoute extends Route {
  @service intl = null;

  @service flashMessages = null;

  @action
  save() {
    const message = this.get('intl').t('accountSettingsSaved');
    this.get('flashMessages').success(message);
    return this.transitionTo('wallets.overview');
  }

  @action
  cancel() {
    return this.transitionTo('wallets.overview');
  }
}
