import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

import { hash } from 'rsvp';

export default Route.extend({
  async model() {
    const wallet = this.modelFor('wallets');
    const account = this.modelFor('wallets.accounts');
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
});
