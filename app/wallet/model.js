import DS from 'ember-data';
import { A } from '@ember/array';
import { computed } from '@ember/object';

import { attr, hasMany } from '@ember-decorators/data';
import { computedDecorator } from '@ember-decorators/utils/computed';

import sumAmounts from '../utils/sum-amounts';

const { Model } = DS;

const sumAccounts = computedDecorator((target, key, desc) => {
  const { value = 0 } = desc;
  return computed(`accounts.@each.${key}`, {
    get() {
      const accounts = this.get('accounts');
      const amounts = A(accounts).mapBy(key);
      return sumAmounts(amounts, value);
    },
  });
});

export default class WalletModel extends Model {
  @hasMany('account', { async: true }) accounts = null;

  @attr seed = null;

  @attr representative = null;

  @sumAccounts balance = 0;

  @sumAccounts pending = 0;
}
