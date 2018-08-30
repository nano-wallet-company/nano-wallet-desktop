import Component from '@ember/component';
import { set } from '@ember/object';

import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';

import SendValidations from '../../validations/send';
import ChangeAmountValidations from '../../validations/change-amount';
import unformatAmount from '../../utils/unformat-amount';

export default class AccountSendComponent extends Component {
  @service intl = null;

  SendValidations = SendValidations;

  ChangeAmountValidations = ChangeAmountValidations;

  @argument accounts = null;

  @argument block = null;

  @action
  async changeAmount(model, value, changeset) {
    set(model, 'amount', null);
    set(changeset, 'amount', value);

    const intl = this.get('intl');
    const amount = unformatAmount(intl, value);
    set(model, 'amount', amount);
    return false;
  }
}
