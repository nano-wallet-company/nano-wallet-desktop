import Component from '@ember/component';
import { get, set } from '@ember/object';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

import SendValidations from '../../validations/send';
import ChangeAmountValidations from '../../validations/change-amount';
import toAmount from '../../utils/to-amount';
import toRaw from '../../utils/to-raw';

export default Component.extend({
  classNames: ['send-form', 'd-flex', 'justify-content-center', 'align-items-center'],
  @service intl: null,

  SendValidations,
  ChangeAmountValidations,

  accounts: null,
  block: null,

  @action
  async changeAmount(model, amount, changeset) {
    set(changeset, 'amount', amount);
    await changeset.validate();
    if (get(changeset, 'isInvalid')) {
      return false;
    }

    const block = this.get('block');
    const source = await get(block, 'source');
    const balance = get(source, 'balance');
    if (toAmount(amount).gt(balance)) {
      const intl = this.get('intl');
      changeset.pushErrors('amount', intl.t('wallets.accounts.send.insufficient'));
      return false;
    }

    const raw = toRaw(amount);
    set(model, 'amount', raw);
    return false;
  },
});
