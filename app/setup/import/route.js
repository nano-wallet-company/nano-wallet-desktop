import Route from '@ember/routing/route';
import { get, action } from '@ember/object';

import { inject as service } from '@ember/service';

export default class SetupImportRoute extends Route {
  @service rpc;

  @action
  cancel() {
    return this.transitionTo('setup');
  }

  @action
  changeType(type) {
    return this.transitionTo({ queryParams: { type } });
  }

  @action
  async changeSeed(model, changeset) {
    const wallet = get(model, 'id');
    const seed = get(changeset, 'seed');
    await this.get('rpc').walletChangeSeed(wallet, seed);
    return this.transitionTo('setup.password', wallet);
  }
}
