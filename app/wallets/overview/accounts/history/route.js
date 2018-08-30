import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

import { hash } from 'ember-concurrency';
import { action } from '@ember-decorators/object';
import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts,
} from 'ember-keyboard-shortcuts';

export default class WalletsOverviewAccountsHistoryRoute extends Route {
  get keyboardShortcuts() {
    return {
      esc: {
        action: 'hideHistory',
        scoped: true,
      },
    };
  }

  activate() {
    return bindKeyboardShortcuts(this);
  }

  async model() {
    const wallet = this.modelFor('wallets');
    const account = this.modelFor('wallets.overview.accounts');
    const history = await this.store.query('history', {
      account: get(account, 'id'),
      count: 100,
    });

    return hash({
      wallet,
      account,
      history,
    });
  }

  setupController(controller, model) {
    const overviewController = this.controllerFor('wallets.overview');
    set(overviewController, 'hideHistory', false);
    set(controller, 'hideHistory', false);
    return super.setupController(controller, model);
  }

  deactivate() {
    const overviewController = this.controllerFor('wallets.overview');
    set(overviewController, 'hideHistory', true);
    set(this.controller, 'hideHistory', true);
    return unbindKeyboardShortcuts(this);
  }

  @action
  hideHistory() {
    return this.transitionTo('wallets.overview');
  }
}
