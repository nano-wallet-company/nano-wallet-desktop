import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

import { AuthenticateError } from '../authenticators/wallet';

export default class LoginRoute extends Route.extend(
  UnauthenticatedRouteMixin,
) {
  @service intl = null;

  @service settings = null;

  @service session = null;

  @service intl = null;

  @service electron = null;

  @service flashMessages = null;

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

  model() {
    const wallet = this.get('session.data.wallet');
    if (!wallet) {
      return this.transitionTo('setup');
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
  }

  @action
  setupWallet() {
    return this.transitionTo('setup');
  }

  @action
  async changeLanguage(language) {
    const intl = this.get('intl');
    intl.setLocale(language);
    const settings = this.get('settings');
    set(settings, 'locale', language);
    return this.transitionTo('index');
  }
}
