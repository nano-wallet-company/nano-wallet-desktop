import Route from '@ember/routing/route';
import { get, set, setProperties, action } from '@ember/object';

import { hash } from 'ember-concurrency';

import { inject as service } from '@ember/service';

export default class WalletsOverviewSettingsRoute extends Route {
  @service rpc;

  renderTemplate() {
    this.render('wallets/overview/settings', {
      into: 'wallets',
      outlet: 'walletSettings',
    });
  }

  model() {
    const wallet = this.modelFor('wallets/overview');
    const seed = this.get('rpc').walletSeed(get(wallet, 'id'));
    return hash({
      wallet,
      seed,
    });
  }

  setupController(controller, models) {
    setProperties(controller, models);
  }

  resetController(controller, isExiting) {
    if (isExiting) {
      set(controller, 'seed', null);
    }
  }

  @action
  cancel() {
    return this.transitionTo('wallets.overview');
  }
}
