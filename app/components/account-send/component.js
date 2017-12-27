import Component from '@ember/component';
import { get, set } from '@ember/object';

import { action } from 'ember-decorators/object';
import { on } from 'ember-decorators/object/evented';

import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

import BigNumber from 'npm:bignumber.js';

import SendValidations from '../../validations/send';
import ChangeAmountValidations from '../../validations/change-amount';
import { prefixes } from '../../utils/format-amount';

export default Component.extend({
  SendValidations,
  ChangeAmountValidations,

  accounts: null,
  block: null,

  changeset: null,
  amount: null,

  @on('init')
  createChangeset() {
    const block = get(this, 'block');
    this.changeset = new Changeset(block, lookupValidator(SendValidations), SendValidations);
  },

  @action
  async changeAmount(amount, changeset) {
    set(changeset, 'amount', amount);
    await changeset.validate();
    if (changeset.get('isInvalid')) {
      return false;
    }

    const multiplier = prefixes.Mxrb;
    const multiplicand = BigNumber(amount).times(multiplier);
    const raw = multiplicand.toFixed(0);
    this.get('changeset').set('amount', raw);
    return false;
  },
});
