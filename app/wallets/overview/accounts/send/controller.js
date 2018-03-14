import Controller from '@ember/controller';

import { controller } from 'ember-decorators/controller';
import { readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

export default Controller.extend({
  @controller('wallets/overview') overviewController: null,

  @readOnly
  @alias('overviewController.sortedAccounts') accounts: null,
});
