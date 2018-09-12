import Component from '@ember/component';

import { argument } from '@ember-decorators/argument';

import { storage } from '../../decorators';

export default class AccountLabelComponent extends Component {
  @storage('account') settings = null;

  @argument account = null;

  @argument truncate = false;
}
