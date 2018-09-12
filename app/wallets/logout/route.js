import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import { action } from '@ember-decorators/object';

import window from 'ember-window-mock';

export default class WalletsLogoutRoute extends Route {
  @action
  cancel() {
    const history = get(window, 'history');
    return tryInvoke(history, 'back');
  }

  @action
  logout() {
    return this.transitionTo('logout');
  }
}
