import Route from '@ember/routing/route';
import { get } from '@ember/object';

import Configuration from 'ember-simple-auth/configuration';

import { service } from '@ember-decorators/service';

const { authenticationRoute } = Configuration;

export default class IndexRoute extends Route {
  @service session = null;

  @service settings = null;

  @service electron = null;

  beforeModel(...args) {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeStarted = get(electron, 'isNodeStarted');
      if (!isNodeStarted) {
        return this.transitionTo('start');
      }
    }

    const settings = this.get('settings');
    const acceptedTerms = get(settings, 'acceptedTerms');
    if (!acceptedTerms) {
      return this.transitionTo('setup.legal');
    }

    return super.beforeModel(...args);
  }

  afterModel() {
    const session = this.get('session');
    const wallet = get(session, 'data.wallet');
    if (!wallet) {
      return this.transitionTo('setup');
    }

    const isAuthenticated = get(session, 'isAuthenticated');
    if (wallet && !isAuthenticated) {
      return this.transitionTo(authenticationRoute);
    }

    return this.transitionTo('wallets', wallet);
  }
}
