import Route from '@ember/routing/route';

import { action } from 'ember-decorators/object';

export default Route.extend({
  @action
  changePassword() {
    return this.transitionTo('wallets.settings.password');
  },
});
