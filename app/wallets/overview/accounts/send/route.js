import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class WalletsOverviewAccountsRoute extends Route {
  @service intl = null;

  @service flashMessages = null;

  renderTemplate() {
    this.render('wallets.overview.accounts.send', {
      into: 'wallets.overview',
      outlet: 'sendOutlet',
    });
  }

  model() {
    const wallet = this.modelFor('wallets');
    const source = this.modelFor('wallets.overview.accounts');
    return this.store.createRecord('block', {
      wallet,
      source,
      destination: null,
      amount: null,
    });
  }

  afterModel() {
    this.controllerFor('wallets.overview').set('isExpanded', true);
  }

  @action
  changeSource(source) {
    return this.transitionTo(this.routeName, source);
  }

  @action
  async sendAmount(changeset) {
    const intl = this.get('intl');
    const flashMessages = this.get('flashMessages');
    try {
      const block = await changeset.save();
      const source = await get(block, 'source');
      const wallet = await get(source, 'wallet');
      flashMessages.success(intl.t('sent'));
      return this.transitionTo('wallets.overview', wallet.reload());
    } catch (err) {
      flashMessages.danger(err.message);
      throw err;
    }
  }
}
