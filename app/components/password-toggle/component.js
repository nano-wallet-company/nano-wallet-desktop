import Component from '@ember/component';

import { classNames } from '@ember-decorators/component';

@classNames('input-group')
class PasswordToggleComponent extends Component {
  inputId = null;

  label = null;

  placeholder = null;

  readonly = false;

  reveal = false;
}

export default PasswordToggleComponent;
