import Component from '@ember/component';

import { classNames } from '@ember-decorators/component';

@classNames('text-truncate')
class AccountLinkComponent extends Component {
  value = null;
}

export default AccountLinkComponent;
