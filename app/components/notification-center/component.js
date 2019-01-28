import Component from '@ember/component';

import { inject as service } from '@ember-decorators/service';

export default class NotificationCenterComponent extends Component {
  @service flashMessages;
}
