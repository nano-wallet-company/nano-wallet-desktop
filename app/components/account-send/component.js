import Component from '@ember/component';
import { set } from '@ember/object';

import { action } from 'ember-decorators/object';
import { on } from 'ember-decorators/object/evented';

import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

import SendValidations from '../../validations/send';
import ChangeAmountValidations from '../../validations/change-amount';
import toRaw from '../../utils/to-raw';

export default Component.extend({
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
    if (changeset.get('isInvalid')) {
      return false;
    }

    const raw = toRaw(amount);
    this.get('changeset').set('amount', raw);
    return false;
  },
});
