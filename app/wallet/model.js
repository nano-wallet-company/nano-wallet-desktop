import DS from 'ember-data';
import { A } from '@ember/array';
import { computed } from '@ember/object';

import { attr, hasMany } from '@ember-decorators/data';
import { computedDecorator } from '@ember-decorators/utils/computed';

import sumAmounts from '../utils/sum-amounts';

const { Model } = DS;

const sumAccounts = computedDecorator((desc) => {
  const { key } = desc;
  return computed(`accounts.@each.${key}`, {
    get() {
      const accounts = this.get('accounts');
      const amounts = A(accounts).mapBy(key);
      return sumAmounts(amounts, 0);
    },
  });
});

export default class WalletModel extends Model {
  @hasMany('account', { async: true }) accounts;

  @hasMany('frontier', { async: true }) frontiers;

  @hasMany('block', { async: true }) blocks;

  @attr('string') seed;

  @attr('string') representative;

  @sumAccounts balance;

  @sumAccounts pending;
}
