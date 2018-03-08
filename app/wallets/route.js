import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import RunMixin from 'ember-lifeline/mixins/run';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default Route.extend(RunMixin, AuthenticatedRouteMixin, {
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
  createAccount(wallet) {
    return this.debounceTask('addAccount', wallet, 1000, true);
  },

  async addAccount(wallet) {
    const account = this.store.createRecord('account', { wallet });
    await account.save();

    const message = this.get('intl').t('wallets.overview.created');
    this.get('flashMessages').success(message);
    return this.transitionTo('wallets.overview', wallet.reload());
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
