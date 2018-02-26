import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { action } from 'ember-decorators/object';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service session: null,
  @service electron: null,

  // eslint-disable-next-line consistent-return
  beforeModel() {
    const session = this.get('session');
    const isAuthenticated = get(session, 'isAuthenticated');
    if (isAuthenticated) {
      return session.invalidate();
    }

    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeStarted = electron.isNodeStarted();
      if (!isNodeStarted) {
        return this.transitionTo('setup.start');
      }
    }
  },

  @action
  createWallet() {
    return this.transitionTo('setup.backup');
  },

  @action
  importWallet() {
    return this.transitionTo('setup.import');
  },
});
