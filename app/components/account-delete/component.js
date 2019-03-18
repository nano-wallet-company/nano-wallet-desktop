import Component from '@ember/component';

import { argument } from '@ember-decorators/argument';

export default class AccountDeleteComponent extends Component {
  @argument account = null;

  @argument onDeleteAccount = null;

  @argument onCancel = null;
}
