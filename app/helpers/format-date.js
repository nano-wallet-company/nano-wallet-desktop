import Helper from '@ember/component/helper';

import { service } from '@ember-decorators/service';
import { observes } from '@ember-decorators/object';

export default class FormatDateHelper extends Helper {
  @service intl = null;

  @observes('intl.{locale,formats.number.decimal}')
  onLocaleChange() {
    this.recompute();
  }

  compute([timestamp = 0]) {
    const d = new Date(timestamp * 1000);
    return d.toLocaleString();
  }
}
