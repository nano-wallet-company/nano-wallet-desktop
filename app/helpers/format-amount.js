import Helper from '@ember/component/helper';

import { inject as service } from '@ember/service';
import { observes } from '@ember-decorators/object';

import formatAmount from '../utils/format-amount';

export default class FormatAmountHelper extends Helper {
  @service intl;

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
