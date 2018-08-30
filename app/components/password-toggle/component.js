import Component from '@ember/component';

import { classNames } from '@ember-decorators/component';
import { argument } from '@ember-decorators/argument';

@classNames('input-group')
class PasswordToggleComponent extends Component {
  @argument inputId = null;

  @argument label = null;

  @argument placeholder = null;

  @argument readonly = false;

  reveal = false;
}

export default PasswordToggleComponent;
