import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service session: null,
  @service electron: null,

  beforeModel() {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeStarted = electron.isNodeStarted();
      if (!isNodeStarted) {
        return this.transitionTo('start');
      }
    }

    return true;
  },

  afterModel() {
    const session = this.get('session');
    const wallet = get(session, 'data.wallet');
    const isAuthenticated = get(session, 'isAuthenticated');
    if (!wallet) {
      return this.transitionTo('setup');
    }

    if (wallet && !isAuthenticated) {
      return this.transitionTo('login');
    }

    return this.transitionTo('wallets', wallet);
  },
});
