import Controller, { inject as controller } from '@ember/controller';

import { reads } from '@ember/object/computed';

export default class WalletsOverviewAccountsSendController extends Controller {
  @controller('wallets/overview') overviewController;

  @reads('overviewController.sortedAccounts') accounts;
}
