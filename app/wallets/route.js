import Route from '@ember/routing/route';
import { get } from '@ember/object';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';

export default class WalletsRoute extends Route.extend(
  AuthenticatedRouteMixin,
) {
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
  async changeRepresentative(model, changeset) {
    const flashMessages = this.get('flashMessages');
    const wallet = get(model, 'id');
    const representative = get(changeset, 'representative');
    try {
      await this.get('rpc').walletRepresentativeSet(wallet, representative);
    } catch (err) {
      const failureMessage = this.get('intl').t('wallets.settings.representativeChangeFailed');
      flashMessages.danger(failureMessage);
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
