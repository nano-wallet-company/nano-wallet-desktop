import Route from '@ember/routing/route';
import { get, set, setProperties } from '@ember/object';
import { isEmpty, tryInvoke } from '@ember/utils';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { storage } from '../../decorators';
import fromAmount from '../../utils/from-amount';

export default class WalletsOverviewRoute extends Route {
  @service intl = null;

  @service flashMessages = null;

  account = null;

  @storage('account') settings = null;

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
    accounts.forEach((account) => {
      this.set('account', account);
      const settings = this.get('settings');
      const isHidden = get(settings, 'hidden');
      const balance = get(account, 'balance');
      const hasBalance = fromAmount(balance).gt(0);
      if (isHidden && !hasBalance) {
        set(account, 'visible', false);
      }
      if (isHidden && hasBalance) {
        set(account, 'visible', true);
        const hidden = false;
        tryInvoke(settings, 'setProperties', [{ hidden }]);
      }
    });
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
