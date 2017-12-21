import Component from '@ember/component';

import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

import SendValidations from '../../validations/send';

export default Component.extend({
  accounts: null,
  changeset: null,

  init(...args) {
    this._super(...args);

    const model = {
      account: null,
      destination: null,
      amount: null,
    };

    this.changeset = new Changeset(model, lookupValidator(SendValidations), SendValidations);
  },

  actions: {
    sendAmount(changeset) {
      this.sendAction('sendAmount', changeset);
    }
  }
});
