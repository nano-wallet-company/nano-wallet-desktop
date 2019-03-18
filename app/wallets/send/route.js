import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { A } from '@ember/array';

export default class WalletsSendRoute extends Route {
  async afterModel(model) {
    const overviewController = this.controllerFor('wallets/overview');
    await get(model, 'accounts');

    const accounts = get(overviewController, 'sortedAccounts');
    const filteredAccounts = [];
    A(filteredAccounts);
    accounts.forEach((account) => {
      const visible = get(account, 'visible');
      if (visible) {
        filteredAccounts.pushObject(account);
      }
    });
    const source = filteredAccounts.get('firstObject');
    return this.transitionTo('wallets.overview.accounts.send', source);
  }
}
