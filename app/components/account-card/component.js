import Component from '@ember/component';

import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';

import toMikPrefix from '../../utils/to-mik-prefix';

export default class AccountCardComponent extends Component {
  @service intl = null;

  @service flashMessages = null;

  @argument account = null;

  @action
  copyAddress(value) {
    const intl = this.get('intl');
    const flashMessages = this.get('flashMessages');
    const address = toMikPrefix(value);
    flashMessages.success(intl.t('addressCopied', { address }));
    return true;
  }
}
