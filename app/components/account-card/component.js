import Component from '@ember/component';

import { service } from '@ember-decorators/service';
import { action, observes } from '@ember-decorators/object';
import { get } from '@ember/object';
import { equal } from '@ember-decorators/object/computed';
import { argument } from '@ember-decorators/argument';
import { storage } from '../../decorators';

import toMikPrefix from '../../utils/to-mik-prefix';
import fromAmount from '../../utils/from-amount';

export default class AccountCardComponent extends Component {
  @service intl = null;

  @service flashMessages = null;

  @argument account = null;

  @storage('account') settings = null;

  @equal('account.balance', 0) hideAble = false;

  @observes('account.balance')
  updateHideability() {
    const balance = get(this.account, 'balance');
    if (fromAmount(balance).gt(0)) {
      this.set('hideAble', false);
    } else {
      this.set('hideAble', true);
    }
  }

  @action
  copyAddress(value) {
    const intl = this.get('intl');
    const flashMessages = this.get('flashMessages');
    const address = toMikPrefix(value);
    flashMessages.success(intl.t('addressCopied', { address }));
    return true;
  }
}
