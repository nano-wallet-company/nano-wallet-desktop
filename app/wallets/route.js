import Route from '@ember/routing/route';
import { get } from '@ember/object';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { service } from 'ember-decorators/service';
import { storageFor } from 'ember-local-storage';

import ElectronRouteMixin from '../mixins/electron-route';

export default Route.extend(AuthenticatedRouteMixin, ElectronRouteMixin, {
  @service electron: null,

  settings: storageFor('settings'),

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

  async afterModel(model) {
    const wallet = get(model, 'id');
    const settings = this.get('settings');
    const settingsKey = `wallets.${wallet}`;
    const walletSettings = get(settings, settingsKey);
    if (!walletSettings) {
      settings.set(settingsKey, {
        label: null,
        accounts: {},
      });
    }
  },
});
