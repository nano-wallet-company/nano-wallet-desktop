import Component from '@ember/component';

import { classNames } from '@ember-decorators/component';
import { argument } from '@ember-decorators/argument';

@classNames('text-truncate')
class AccountAmountCompoennt extends Component {
  @argument value = null;
}

export default AccountAmountCompoennt;
