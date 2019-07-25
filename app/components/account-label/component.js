import Component from '@ember/component';

import { storageFor } from 'ember-local-storage';

export default class AccountLabelComponent extends Component {
  @storageFor('settings', 'account') settings;

  account = null;

  truncate = false;
}
