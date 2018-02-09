import Route from '@ember/routing/route';
import { get } from '@ember/object';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import { storageFor } from 'ember-local-storage';

export default Route.extend(AuthenticatedRouteMixin, {
  settings: storageFor('settings'),

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
