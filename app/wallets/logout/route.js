import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

export default Route.extend({
  @service window: null,

  @action
  cancel() {
    const window = this.get('window');
    const history = get(window, 'history');
    return tryInvoke(history, 'back');
  },

  @action
  logout() {
    return this.transitionTo('logout');
  },
});
