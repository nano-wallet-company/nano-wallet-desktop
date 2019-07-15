import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class WalletsOverviewAccountsSettingsRoute extends Route {
  @service intl;

  @service flashMessages;

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
