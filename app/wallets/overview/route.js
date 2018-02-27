import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { isEmpty } from '@ember/utils';

import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import { debounce } from '@ember/runloop';

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
  createAccount(wallet) {
    return debounce(this, this.debouncedCreateAccount, wallet, 1000, true);
  },

  debouncedCreateAccount(wallet) {
    return this.transitionTo(this.routeName, this.addAccount(wallet));
  },

  async addAccount(wallet) {
    const account = this.store.createRecord('account', { wallet });
    await account.save();
    return wallet.reload();
  },
});
