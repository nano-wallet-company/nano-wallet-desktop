import Controller from '@ember/controller';

import { controller } from '@ember-decorators/controller';
import { readOnly } from '@ember-decorators/object/computed';

export default class WalletsOverviewAccountsSendController extends Controller {
  @controller('wallets/overview') overviewController = null;

  @readOnly('overviewController.sortedAccounts') accounts = null;
}
