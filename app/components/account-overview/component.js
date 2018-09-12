import Component from '@ember/component';

import { argument } from '@ember-decorators/argument';

export default class AccountOverviewComponent extends Component {
  @argument account = null;

  @argument onDelete = null;
}
