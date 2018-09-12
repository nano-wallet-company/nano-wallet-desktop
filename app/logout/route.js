import Route from '@ember/routing/route';
import { get } from '@ember/object';

import Configuration from 'ember-simple-auth/configuration';

import { service } from '@ember-decorators/service';

const { authenticationRoute } = Configuration;

export default class LogoutRoute extends Route {
  @service session = null;

  beforeModel() {
    const session = this.get('session');
    const isAuthenticated = get(session, 'isAuthenticated');
    if (!isAuthenticated) {
      return this.transitionTo(authenticationRoute);
    }

    return session.invalidate();
  }
}
