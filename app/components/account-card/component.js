import Component from '@ember/component';

import { inject as service } from '@ember/service';
import { action } from '@ember/object';

import toNanoPrefix from '../../utils/to-nano-prefix';

export default class AccountCardComponent extends Component {
  @service intl;

  @service flashMessages;

  account = null;

  @action
  copyAddress(value) {
    const intl = this.get('intl');
    const flashMessages = this.get('flashMessages');
    const address = toNanoPrefix(value);
    flashMessages.success(intl.t('addressCopied', { address }));
    return true;
  }
}
