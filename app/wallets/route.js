import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service status: null,

  setupController(model, controller) {
    this._super(model, controller);
    const status = this.get('status');
    set(controller, 'status', get(status, 'proxy'));
  },
});
