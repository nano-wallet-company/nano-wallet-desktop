import Component from '@ember/component';
import { set, action } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import { on } from '@ember-decorators/object';

import UnlockWalletValidations from '../../validations/unlock-wallet';

export default class WalletUnlockComponent extends Component {
  UnlockWalletValidations = UnlockWalletValidations;

  wallet = null;

  password = null;

  onSubmit = null;

  @on('willDestroyElement')
  clear() {
    this.set('password', null);
  }

  @action
  destroyChangeset(changeset) {
    set(changeset, 'password', null);
    tryInvoke(changeset, 'destroy');
  }
}
