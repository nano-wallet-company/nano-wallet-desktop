import Route from '@ember/routing/route';
import { get, setProperties } from '@ember/object';
import { isEmpty } from '@ember/utils';

import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class WalletsOverviewRoute extends Route {
  @service intl = null;

  @service flashMessages = null;

  beforeModel(...args) {
    const walletOverviewController = this.controllerFor('wallets.overview');
    setProperties(walletOverviewController, {
      hideHistory: true,
      isExpanded: false,
    });

    return super.beforeModel(...args);
  }

  async afterModel(wallet) {
    const accounts = await get(wallet, 'accounts');
    if (isEmpty(accounts)) {
      await this.store.createRecord('account', { wallet }).save();
    }

    return wallet;
  }

  @action
  changeSlide(slide) {
    return this.transitionTo({ queryParams: { slide } });
  }

  @action
  changeCurrency(currency) {
    return this.transitionTo({ queryParams: { currency } });
  }

  @action
  openSend(wallet) {
    return this.transitionTo('wallets.send', wallet);
  }

  @action
  closeSend(wallet) {
    return this.transitionTo(this.routeName, wallet);
  }
}
