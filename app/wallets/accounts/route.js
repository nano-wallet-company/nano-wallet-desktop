import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';
import { computed } from 'ember-decorators/object';

import { storageFor } from 'ember-local-storage';

export default Route.extend({
  @service intl: null,

  settings: storageFor('settings'),

  @computed('intl.locale')
  get breadCrumb() {
    return {
      title: this.get('intl').t('account'),
      path: 'wallets.accounts',
    };
  },

  async afterModel(model) {
    const wallet = await get(model, 'wallet.id');
    const account = get(model, 'id');
    const settings = this.get('settings');
    const settingsKey = `wallets.${wallet}.accounts.${account}`;
    const accountSettings = get(settings, settingsKey);
    if (!accountSettings) {
      settings.set(settingsKey, { label: null });
    }
  },
});
