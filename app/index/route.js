import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service session: null,
  @service electron: null,

  // eslint-disable-next-line consistent-return
  beforeModel() {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeStarted = electron.isNodeStarted();
      if (!isNodeStarted) {
        return this.transitionTo('start');
      }
    }
  },

  afterModel() {
    const session = this.get('session');
    const isAuthenticated = get(session, 'isAuthenticated');
    if (!isAuthenticated) {
      return this.transitionTo('setup');
    }

    const wallet = get(session, 'data.authenticated.wallet');
    return this.transitionTo('wallets', wallet);
  },
});
