import Route from '@ember/routing/route';
import { get, setProperties } from '@ember/object';
import { isEmpty } from '@ember/utils';

import { action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';

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

  setupController(controller, model) {
    setProperties(controller, {
      hideHistory: true,
      isExpanded: false,
    });

    return super.setupController(controller, model);
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
