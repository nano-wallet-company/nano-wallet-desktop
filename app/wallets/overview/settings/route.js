import Route from '@ember/routing/route';

import { action } from '@ember-decorators/object';

export default class WalletsOverviewSettingsRoute extends Route {
  renderTemplate() {
    this.render('wallets/overview/settings', {
      into: 'wallets',
      outlet: 'walletSettings',
    });
  }

  @action
  cancel() {
    return this.transitionTo('wallets.overview');
  }
}
