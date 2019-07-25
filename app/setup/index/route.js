import Route from '@ember/routing/route';
import { get, action } from '@ember/object';

import { inject as service } from '@ember/service';

export default class SetupIndexRoute extends Route {
  @service session;

  @service electron;

  beforeModel(...args) {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeStarted = get(electron, 'isNodeStarted');
      if (!isNodeStarted) {
        return this.transitionTo('setup.start');
      }
    }

    const session = this.get('session');
    const isAuthenticated = get(session, 'isAuthenticated');
    if (isAuthenticated) {
      return session.invalidate();
    }

    return super.beforeModel(...args);
  }

  @action
  createWallet() {
    return this.transitionTo('setup.backup');
  }

  @action
  importWallet() {
    return this.transitionTo('setup.import');
  }
}
