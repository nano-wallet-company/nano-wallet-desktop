import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { isEmpty } from '@ember/utils';

import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  @service intl: null,
  @service flashMessages: null,

  async afterModel(wallet) {
    const accounts = await get(wallet, 'accounts');
    if (isEmpty(accounts)) {
      return this.store.createRecord('account', { wallet }).save();
    }

    return wallet;
  },

  @action
  async createAccount(wallet) {
    const account = await this.store.createRecord('account', { wallet }).save();
    const message = this.get('intl').t('wallets.overview.created');
    this.get('flashMessages').success(message);
    return this.transitionTo('wallets.accounts', account);
  },
});
