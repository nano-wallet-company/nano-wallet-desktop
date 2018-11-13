import Controller from '@ember/controller';

import { controller } from '@ember-decorators/controller';
import { overridableReads } from '@ember-decorators/object/computed';

export default class WalletsOverviewAccountsSendController extends Controller {
  @controller('wallets/overview') overviewController = null;

  @overridableReads('overviewController.sortedAccounts') accounts = null;
}
