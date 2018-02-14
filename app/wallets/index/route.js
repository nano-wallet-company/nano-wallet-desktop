import Route from '@ember/routing/route';

import { service } from 'ember-decorators/service';
import { computed } from 'ember-decorators/object';

export default Route.extend({
  @service intl: null,

  @computed('intl.locale')
  get breadCrumb() {
    return {
      title: this.get('intl').t('wallet'),
      path: 'wallets.overview',
    };
  },

  redirect() {
    return this.transitionTo('wallets.overview');
  },
});
