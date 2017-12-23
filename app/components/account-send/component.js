import Component from '@ember/component';
import { get, set } from '@ember/object';

import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

import SendValidations from '../../validations/send';

export default Component.extend({
  accounts: null,
  block: null,

  changeset: null,

  init(...args) {
    this._super(...args);
    const block = get(this, 'block');
    this.changeset = new Changeset(block, lookupValidator(SendValidations), SendValidations);
  },

  actions: {
    changeSource(source) {
      const changeset = get(this, 'changeset');
      set(changeset, 'source', source);
      this.sendAction('changeSource', source);
      return false;
    },

    sendAmount(changeset) {
      this.sendAction('sendAmount', changeset);
    }
  }
});
