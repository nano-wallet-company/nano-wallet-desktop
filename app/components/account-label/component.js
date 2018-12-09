import Component from '@ember/component';

import { storage } from '../../decorators';

export default class AccountLabelComponent extends Component {
  @storage('account') settings;

  account = null;

  truncate = false;
}
