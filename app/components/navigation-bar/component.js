import Component from '@ember/component';

import { action } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';

export default class NavigationBarComponent extends Component {
  @argument wallet = null;

  @argument show = false;

  @argument onCreateAccount = null;

  @argument onChangeRepresentative = null;

  @argument onChangePassword = null;

  @action
  toggleShow() {
    this.toggleProperty('show');
  }
}
