import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { action } from 'ember-decorators/object';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { service } from 'ember-decorators/service';
import { storageFor } from 'ember-local-storage';

export default Route.extend(AuthenticatedRouteMixin, {
  @service electron: null,

  settings: storageFor('settings'),

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

  setupController(controller, model) {
    this._super(controller, model);

    const poller = get(controller, 'poller');
    tryInvoke(poller, 'resume');
  },

  @action
  async createAccount(wallet) {
    const account = await this.store.createRecord('account', { wallet }).save();
    const message = this.get('intl').t('wallets.overview.created');
    this.get('flashMessages').success(message);
    return this.transitionTo('wallets.accounts', account);
  },
});
