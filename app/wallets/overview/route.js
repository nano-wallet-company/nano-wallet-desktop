import Route from '@ember/routing/route';
import { get, setProperties, action } from '@ember/object';
import { isEmpty } from '@ember/utils';

import { inject as service } from '@ember/service';

export default class WalletsOverviewRoute extends Route {
  @service intl;

  @service flashMessages;

  async afterModel(wallet) {
    const accounts = await get(wallet, 'accounts');
    if (isEmpty(accounts)) {
      await this.store.createRecord('account', { wallet }).save();
    }

    return wallet;
  }

  resetController(controller, isExiting) {
    setProperties(controller, {
      hideHistory: true,
      isExpanded: false,
    });

    return super.resetController(controller, isExiting);
  }

  @action
  changeSlide(sortedAccounts, slide) {
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
