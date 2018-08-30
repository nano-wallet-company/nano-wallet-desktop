import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class SetupPasswordRoute extends Route {
  @service rpc = null;

  @service session = null;

  @action
  async changePassword(model, changeset) {
    const session = this.get('session');
    const wallet = get(model, 'id');
    const password = get(changeset, 'password');
    await this.get('rpc').passwordChange(wallet, password);

    set(session, 'data.wallet', wallet);
    return session.authenticate('authenticator:wallet', { wallet, password });
  }
}
