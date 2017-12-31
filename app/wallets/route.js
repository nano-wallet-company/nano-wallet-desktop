import Route from '@ember/routing/route';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service settings: null,

  async afterModel(model) {
    const settings = this.get('settings');
    const serialized = this.store.serialize(model, { includeId: true });
    settings.setProperties(serialized);
  },
});
