import Component from '@ember/component';

import { argument } from '@ember-decorators/argument';

export default class AccountHistoryComponent extends Component {
  @argument history = null;
}
