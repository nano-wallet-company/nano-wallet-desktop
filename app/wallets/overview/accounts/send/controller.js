import Controller from '@ember/controller';

import { inject as controller } from '@ember-decorators/controller';
import { reads } from '@ember-decorators/object/computed';

export default class WalletsOverviewAccountsSendController extends Controller {
  @controller('wallets/overview') overviewController;

  @reads('overviewController.sortedAccounts') accounts;
}
