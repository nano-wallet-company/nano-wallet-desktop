import Component from '@ember/component';
import { set, action } from '@ember/object';

import { inject as service } from '@ember/service';

import SendValidations from '../../validations/send';
import ChangeAmountValidations from '../../validations/change-amount';
import unformatAmount from '../../utils/unformat-amount';

export default class AccountSendComponent extends Component {
  @service intl;

  SendValidations = SendValidations;

  ChangeAmountValidations = ChangeAmountValidations;

  accounts = null;

  block = null;

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
