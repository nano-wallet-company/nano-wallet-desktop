import Route from '@ember/routing/route';
import { get, set, action } from '@ember/object';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import { inject as service } from '@ember/service';

export default class WalletsRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service intl;

  @service session;

  @service electron;

  @service rpc;

  @service flashMessages;

  beforeModel(...args) {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeStarted = get(electron, 'isNodeStarted');
      if (!isNodeStarted) {
        return this.transitionTo('start');
      }
    }

    return super.beforeModel(...args);
  }

  @action
  async createAccount(wallet) {
    const account = this.store.createRecord('account');
    account.set('wallet', wallet);
    await account.save();

    const message = this.get('intl').t('wallets.overview.created');
    this.get('flashMessages').success(message);
  }

  @action
  async changeRepresentative(wallet, changeset) {
    const flashMessages = this.get('flashMessages');
    try {
      const representative = get(changeset, 'representative');
      set(wallet, 'representative', representative);
      await wallet.save();
    } catch (err) {
      const failureMessage = this.get('intl').t('wallets.settings.representativeChangeFailed');
      flashMessages.danger(failureMessage);
      wallet.rollbackAttributes();
      throw err;
    }

    const message = this.get('intl').t('wallets.settings.representativeChanged');
    flashMessages.success(message);
    return this.transitionTo('wallets.overview');
  }

  @action
  async changePassword(model, changeset) {
    const session = this.get('session');
    const wallet = get(model, 'id');
    const password = get(changeset, 'password');
    await this.get('rpc').passwordChange(wallet, password);
    await session.authenticate('authenticator:wallet', { wallet, password });

    const flashMessages = this.get('flashMessages');
    const message = this.get('intl').t('wallets.settings.passwordChanged');
    flashMessages.success(message);
    return this.transitionTo('wallets.overview');
  }
}
