import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { action } from 'ember-decorators/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { service } from 'ember-decorators/service';

export default Route.extend(AuthenticatedRouteMixin, {
  @service intl: null,
  @service electron: null,
  @service rpc: null,
  @service session: null,

  beforeModel() {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeStarted = electron.isNodeStarted();
      if (!isNodeStarted) {
        return this.transitionTo('start');
      }
    }

    return true;
  },

  setupController(controller, model) {
    this._super(controller, model);

    const poller = get(controller, 'poller');
    tryInvoke(poller, 'resume');
  },

  @action
  async createAccount(wallet) {
    await this.store.createRecord('account', { wallet }).save();
    const message = this.get('intl').t('wallets.overview.created');
    this.get('flashMessages').success(message);
  },

  @action
  async changePassword(model, changeset) {
    const session = this.get('session');
    const wallet = get(model, 'id');
    const password = get(changeset, 'password');
    await this.get('rpc').passwordChange(wallet, password);
    await session.authenticate('authenticator:wallet', { wallet, password });
    const flashMessages = this.controllerFor('wallets').get('flashMessages');
    const message = this.get('intl').t('wallets.settings.passwordChanged');
    flashMessages.success(message);
    return this.transitionTo('wallets.overview');
  },
});
