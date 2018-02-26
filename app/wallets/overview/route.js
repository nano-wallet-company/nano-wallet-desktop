import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { isEmpty } from '@ember/utils';

import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  @service intl: null,
  @service flashMessages: null,

  beforeModel() {
    const walletOverviewController = this.controllerFor('wallets.overview');
    walletOverviewController.set('hideHistory', true);
    walletOverviewController.set('expand', false);
    walletOverviewController.set('shrink', false);
    walletOverviewController.set('active', false);
  },

  async afterModel(wallet) {
    const accounts = await get(wallet, 'accounts');
    if (isEmpty(accounts)) {
      return this.store.createRecord('account', { wallet }).save();
    }
    return wallet;
  },

  @action
  async createAccount(wallet) {
    await this.store.createRecord('account', { wallet }).save();
    const message = this.get('intl').t('wallets.overview.created');
    this.get('flashMessages').success(message);
    this.transitionTo('wallets.overview');
  },

  @action
  toggleButton() {
    const walletOverviewController = this.controllerFor('wallets.overview');
    if (walletOverviewController.get('expand')) {
      walletOverviewController.toggleProperty('shrink');
      walletOverviewController.toggleProperty('expand');
    } else if (walletOverviewController.get('firstTime')) {
      walletOverviewController.set('firstTime', false);
      walletOverviewController.toggleProperty('expand');
    } else {
      walletOverviewController.toggleProperty('shrink');
      walletOverviewController.toggleProperty('expand');
    }
  },
});
