import Component from '@ember/component';
import { action } from 'ember-decorators/object';

export default Component.extend({
  wallet: null,
  show: false,

  onCreateAccount: null,
  onChangeRepresentative: null,
  onChangePassword: null,

  @action
  toggleShow() {
    this.toggleProperty('show');
  },
});
