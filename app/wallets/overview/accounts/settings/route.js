import Route from '@ember/routing/route';

import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class WalletsOverviewAccountsSettingsRoute extends Route {
  @service intl = null;

  @service flashMessages = null;

  @action
  save() {
    return this.transitionTo('wallets.overview');
  }

  @action
  cancel() {
    return this.transitionTo('wallets.overview');
  }
}
