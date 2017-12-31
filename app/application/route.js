import Route from '@ember/routing/route';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service intl: null,

  beforeModel() {
    return this.get('intl').setLocale(['en-us']);
  },
});
