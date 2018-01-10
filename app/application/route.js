import Route from '@ember/routing/route';

import nprogress from 'nprogress';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

export default Route.extend({
  @service intl: null,

  beforeModel() {
    return this.get('intl').setLocale(['en-us']);
  },

  @action
  loading(transition) {
    nprogress.start();
    transition.finally(() => nprogress.done());
    return true;
  },
});
