import Component from '@ember/component';

import { classNames } from '@ember-decorators/component';
import { argument } from '@ember-decorators/argument';

@classNames('row', 'no-gutters', 'justify-content-center')
class AccountHistoryEntryComponent extends Component {
  @argument entry = null;
}

export default AccountHistoryEntryComponent;
