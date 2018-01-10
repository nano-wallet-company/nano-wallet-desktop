import Route from '@ember/routing/route';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default Route.extend(AuthenticatedRouteMixin, {
  @service session: null,

  @action
  cancel() {
    return window.history.back();
  },

  @action
  logout() {
    return this.transitionTo('logout');
  },
});
