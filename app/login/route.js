import Route from '@ember/routing/route';
import { get, action } from '@ember/object';

import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

import { inject as service } from '@ember/service';

import { AuthenticateError } from '../authenticators/wallet';

export default class LoginRoute extends Route.extend(UnauthenticatedRouteMixin) {
  @service intl;

  @service session;

  @service electron;

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

  async model() {
    const wallet = this.get('session.data.wallet');
    if (!wallet) {
      return this.transitionTo('setup');
    }

    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const password = await electron.getPassword(wallet);
      if (password) {
        await this.get('session').authenticate('authenticator:wallet', { wallet, password });
      }
    }

    return wallet;
  }

  @action
  async unlockWallet(changeset) {
    const wallet = get(changeset, 'wallet');
    const password = get(changeset, 'password');
    try {
      await this.get('session').authenticate('authenticator:wallet', { wallet, password });
    } catch (err) {
      if (!(err instanceof AuthenticateError)) {
        throw err;
      }

      const message = this.get('intl').t('wallets.unlock.invalidPassword');
      this.get('flashMessages').danger(message);
      throw err;
    }

    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      await electron.setPassword(wallet, password);
    }
  }

  @action
  setupWallet() {
    return this.transitionTo('setup');
  }
}
