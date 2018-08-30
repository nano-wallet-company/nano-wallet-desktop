import Component from '@ember/component';
import { set } from '@ember/object';
import { tryInvoke } from '@ember/utils';

import { action } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';

import UnlockWalletValidations from '../../validations/unlock-wallet';

export default class WalletUnlockComponent extends Component {
  UnlockWalletValidations = UnlockWalletValidations;

  @argument wallet = null;

  @argument password = null;

  @argument onSubmit = null;

  @action
  clearPassword(changeset) {
    set(changeset, 'password', null);
    tryInvoke(changeset, 'destroy');
  }
}
