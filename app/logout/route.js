import Route from '@ember/routing/route';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service session: null,

  beforeModel() {
    return this.get('session').invalidate();
  },
});
