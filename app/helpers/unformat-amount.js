import Helper from '@ember/component/helper';

import { service } from '@ember-decorators/service';
import { observes } from '@ember-decorators/object';

import unformatAmount from '../utils/unformat-amount';

export default class UnformatAmountHelper extends Helper {
  @service intl = null;

  @observes('intl.{locale,formats.number.decimal}')
  onLocaleChange() {
    this.recompute();
  }

  compute([value = 0], params = {}) {
    const intl = this.get('intl');
    return unformatAmount(intl, value, params);
  }
}
