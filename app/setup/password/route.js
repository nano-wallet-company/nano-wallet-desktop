import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

export default Route.extend({
  @service rpc: null,
  @service session: null,

  @action
  async changePassword(wallet, changeset) {
    const session = this.get('session');
    const walletId = get(wallet, 'id');
    const password = get(changeset, 'password');
    await this.get('rpc').passwordChange(walletId, password);
    return session.authenticate('authenticator:wallet', { password, wallet: walletId });
  },
});
