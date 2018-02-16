import DS from 'ember-data';
import { A } from '@ember/array';
import { get, computed } from '@ember/object';

import { service } from 'ember-decorators/service';
import { attr, hasMany } from 'ember-decorators/data';

import sumAmounts from '../utils/sum-amounts';

const sumAccountsProperty = dependentKey =>
  computed(`accounts.@each.${dependentKey}`, {
    get() {
      const accounts = this.get('accounts');
      const amounts = A(accounts).mapBy(dependentKey);
      return sumAmounts(amounts);
    },
  });

export default DS.Model.extend({
  @service settings: null,

  @hasMany('account', { async: true }) accounts: null,

  @attr seed: null,

  balance: sumAccountsProperty('balance'),
  pending: sumAccountsProperty('pending'),

  toString() {
    const id = this.get('id');
    const settings = this.get('settings');
    return get(settings, `wallets.${id}.label`) || id;
  },
});
