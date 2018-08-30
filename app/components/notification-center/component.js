import Component from '@ember/component';

import { service } from '@ember-decorators/service';

export default class NotificationCenterComponent extends Component {
  @service flashMessages = null;
}
