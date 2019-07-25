import Component from '@ember/component';

import { action } from '@ember/object';

export default class NavigationBarComponent extends Component {
  wallet = null;

  show = false;

  onCreateAccount = null;

  onChangeRepresentative = null;

  onChangePassword = null;

  @action
  toggleShow() {
    this.toggleProperty('show');
  }
}
