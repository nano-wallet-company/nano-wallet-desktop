import Component from '@ember/component';

import { argument } from '@ember-decorators/argument';

export default class AccountCreateComponent extends Component {
  @argument wallet = null;

  @argument onCreate = null;

  @argument onCancel = null;
}
