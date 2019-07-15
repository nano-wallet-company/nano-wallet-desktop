import DS from 'ember-data';
import { A } from '@ember/array';
import { computed } from '@ember/object';

import sumAmounts from '../utils/sum-amounts';

const { Model, attr, hasMany } = DS;

export default class WalletModel extends Model {
  @hasMany('account', { async: true }) accounts;

  @hasMany('frontier', { async: true }) frontiers;

  @hasMany('block', { async: true }) blocks;

  @attr('string') seed;

  @attr('string') representative;

  @computed('accounts.@each.balance')
  get balance() {
    const accounts = this.get('accounts');
    const amounts = A(accounts).mapBy('balance');
    return sumAmounts(amounts, 0);
  }

  @computed('accounts.@each.pending')
  get pending() {
    const accounts = this.get('accounts');
    const amounts = A(accounts).mapBy('pending');
    return sumAmounts(amounts, 0);
  }
}
