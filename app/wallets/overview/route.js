import Route from '@ember/routing/route';
import { get, getProperties, setProperties } from '@ember/object';
import { isEmpty } from '@ember/utils';

import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default Route.extend({
  @service intl: null,
  @service flashMessages: null,

  beforeModel(...args) {
    const walletOverviewController = this.controllerFor('wallets.overview');
    setProperties(walletOverviewController, {
      hideHistory: true,
      expand: false,
      shrink: false,
      active: false,
    });

    return this._super(...args);
  },

  async afterModel(wallet) {
    const accounts = await get(wallet, 'accounts');
    if (isEmpty(accounts)) {
      await this.store.createRecord('account', { wallet }).save();
    }

    return wallet;
  },

  @action
  changeSlide(slide) {
    return this.transitionTo({ queryParams: { slide } });
  },

  @action
  changeCurrency(currency) {
    return this.transitionTo({ queryParams: { currency } });
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
