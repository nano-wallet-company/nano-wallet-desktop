import Component from '@ember/component';

import { classNames } from '@ember-decorators/component';

@classNames('row', 'no-gutters', 'justify-content-center')
class AccountHistoryEntryComponent extends Component {
  entry = null;
}

export default AccountHistoryEntryComponent;
