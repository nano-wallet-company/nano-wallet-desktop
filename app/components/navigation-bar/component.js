import Component from '@ember/component';

import { get } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { action } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';
import { storage } from '../../decorators';

export default class NavigationBarComponent extends Component {
  @argument wallet = null;

  @argument show = false;

  @argument onChangeRepresentative = null;

  @argument onChangePassword = null;

  @argument onNodeIdReset = null;

  @argument onNodeIdSet = null;

  @argument onChangeLanguage = null;

  account = null;

  @storage('account') settings = null;

  @action
  toggleShow() {
    this.toggleProperty('show');
  }

  @action
  revealAccounts() {
    const accounts = get(this.wallet, 'accounts');
    accounts.forEach((account) => {
      this.set('account', account);
      const settings = this.get('settings');
      const hidden = false;
      tryInvoke(settings, 'setProperties', [{ hidden }]);
    });
    window.location.href = '/';
  }
}
