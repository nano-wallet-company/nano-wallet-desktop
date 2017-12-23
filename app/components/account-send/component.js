import Component from '@ember/component';
import { get } from '@ember/object';

import { on } from 'ember-decorators/object/evented';

import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

import SendValidations from '../../validations/send';

export default Component.extend({
  accounts: null,
  block: null,

  changeset: null,

  @on('init')
  createChangeset() {
    const block = get(this, 'block');
    this.changeset = new Changeset(block, lookupValidator(SendValidations), SendValidations);
  },
});
