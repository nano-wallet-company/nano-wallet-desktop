import Component from '@ember/component';
import { get, set } from '@ember/object';

import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';
import { on } from 'ember-decorators/object/evented';

import SendValidations from '../../validations/send';
import ChangeAmountValidations from '../../validations/change-amount';
import toAmount from '../../utils/to-amount';
import toRaw from '../../utils/to-raw';

export default Component.extend({
  @service intl: null,

  SendValidations,
  ChangeAmountValidations,

  accounts: null,
  block: null,

  changeset: null,
  amount: null,

  @on('init')
  createChangeset() {
    const block = this.get('block');
    this.changeset = new Changeset(block, lookupValidator(SendValidations), SendValidations);
  },

  @action
  async changeAmount(amount, changeset) {
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
    this.get('changeset').set('amount', raw);
    return false;
  },
});
