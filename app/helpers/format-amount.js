import Helper from '@ember/component/helper';

import { service } from '@ember-decorators/service';
import { observes } from '@ember-decorators/object';

import formatAmount from '../utils/format-amount';

export default class FormatAmountHelper extends Helper {
  @service intl = null;

  @observes('intl.{locale,formats.number.decimal}')
  onLocaleChange() {
    this.recompute();
  }

  compute([value = 0], params = {}) {
    const intl = this.get('intl');
    const amount = formatAmount(intl, value, params);
    return intl.t('currency', { amount });
  }
}
