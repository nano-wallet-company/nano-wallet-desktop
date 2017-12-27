import Component from '@ember/component';
import { get, set } from '@ember/object';

import { action } from 'ember-decorators/object';
import { on } from 'ember-decorators/object/evented';

import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

import BigNumber from 'npm:bignumber.js';

import SendValidations from '../../validations/send';
import { prefixes } from '../../utils/format-amount';

export default Component.extend({
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
  updateAmount(value, changeset) {
    if (!value) {
      return false;
    }

    const multiplier = prefixes.Mxrb;
    const multiplicand = BigNumber(value).times(multiplier);
    const raw = multiplicand.toFixed(0);
    set(changeset, 'amount', raw);
    return false;
  },
});
