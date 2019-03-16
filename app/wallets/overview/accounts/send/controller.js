import Controller from '@ember/controller';

import { controller } from '@ember-decorators/controller';
import { readOnly } from '@ember-decorators/object/computed';
import { get } from '@ember/object';
import { A } from '@ember/array';

export default class WalletsOverviewAccountsSendController extends Controller {
  @controller('wallets/overview') overviewController = null;

  @readOnly('overviewController.sortedAccounts') accounts = null;

  get filteredAccounts() {
    const allAccounts = get(this.overviewController, 'sortedAccounts');
    const filteredAccounts = [];
    A(filteredAccounts);
    allAccounts.forEach((account) => {
      const visible = get(account, 'visible');
      if (visible) {
        filteredAccounts.pushObject(account);
      }
    });
    return filteredAccounts;
  }
}
