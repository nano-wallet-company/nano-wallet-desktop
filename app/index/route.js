import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';

import ElectronRouteMixin from '../mixins/electron-route';

export default Route.extend(ElectronRouteMixin, {
  @service session: null,

  afterModel() {
    const session = this.get('session');
    const wallet = get(session, 'data.wallet');
    const isAuthenticated = get(session, 'isAuthenticated');
    if (!wallet) {
      return this.transitionTo('setup');
    }

    if (wallet && !isAuthenticated) {
      return this.transitionTo('login');
    }

    return this.transitionTo('wallets', wallet);
  },
});
