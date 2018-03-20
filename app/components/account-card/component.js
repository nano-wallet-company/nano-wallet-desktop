import Component from '@ember/component';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

export default Component.extend({
  @service intl: null,
  @service flashMessages: null,

  account: null,

  @action
  copyAddress(address) {
    const intl = this.get('intl');
    const flashMessages = this.get('flashMessages');
    flashMessages.success(intl.t('addressCopied', { address }));
    return true;
  },
});
