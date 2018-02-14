import Route from '@ember/routing/route';

import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default Route.extend({
  @service intl: null,
  @service flashMessages: null,

  activeAccount: 0,
    @action
  changeSource(source) {
    return this.transitionTo(this.routeName, source);
  },
@action
  async sendAmount(changeset) {
    await changeset.save();
    const account = this.modelFor('wallets.accounts');
    return this.transitionTo('wallets.accounts', account);
  },
@action
  afterChange(swiped) {
    this.set('activeAccount', swiped.currentSlide);
  },
@action
  async createAccount(wallet) {
    const account = await this.store.createRecord('account', { wallet }).save();
    const message = this.get('intl').t('wallets.overview.created');
    this.get('flashMessages').success(message);
    return this.transitionTo('wallets.accounts', account);
  },
});
