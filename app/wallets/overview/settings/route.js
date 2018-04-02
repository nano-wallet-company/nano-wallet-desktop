import Route from '@ember/routing/route';

import { action } from 'ember-decorators/object';

export default Route.extend({
  renderTemplate() {
    this.render('wallets/overview/settings', {
      into: 'wallets',
      outlet: 'walletSettings',
    });
  },

  @action
  cancel() {
    return this.transitionTo('wallets.overview');
  },
});
