import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service settings: null,
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

  afterModel(model, transaction) {
    const settings = this.get('settings');
    const wallet = settings.get('wallet');
    if (!wallet) {
      transaction.abort();
      return this.transitionTo('setup');
    }

    return this.transitionTo('wallets', wallet);
  },
});
