import Route from '@ember/routing/route';
import { get, getProperties, setProperties } from '@ember/object';
import { isEmpty } from '@ember/utils';

import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  @service intl: null,
  @service flashMessages: null,

  activate() {
    const walletOverviewController = this.controllerFor('wallets.overview');
    setProperties(walletOverviewController, {
      hideHistory: true,
      expand: false,
      shrink: false,
      active: false,
    });
  },

  async afterModel(wallet) {
    const accounts = await get(wallet, 'accounts');
    if (isEmpty(accounts)) {
      return this.store.createRecord('account', { wallet }).save();
    }

    return wallet;
  },

  @action
  toggleButton() {
    const walletOverviewController = this.controllerFor('wallets.overview');
    const { expand, shrink, firstTime } = getProperties(walletOverviewController, [
      'expand',
      'shrink',
      'firstTime',
    ]);

    if (expand) {
      setProperties(walletOverviewController, { expand: false, shrink: true });
    } else if (firstTime) {
      setProperties(walletOverviewController, { firstTime: false, expand: true });
    } else {
      setProperties(walletOverviewController, { expand: !expand, shrink: !shrink });
    }
  },
});
