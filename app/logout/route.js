import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service session: null,

  beforeModel() {
    const session = this.get('session');
    const isAuthenticated = get(session, 'isAuthenticated');
    if (!isAuthenticated) {
      return this.transitionTo('index');
    }

    return session.invalidate();
  },
});
