import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
  async model() {
    const account = this.modelFor('wallets.accounts');
    const history = await this.store.query('history', {
      account: get(account, 'id'),
      count: 10,
    });

    set(account, 'history', history);

    return account;
  }
});
