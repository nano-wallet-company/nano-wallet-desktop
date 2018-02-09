import DS from 'ember-data';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';
import { attr, hasMany } from 'ember-decorators/data';

export default DS.Model.extend({
  @service settings: null,

  @hasMany('account', { async: true }) accounts: null,

  @attr('big-number') balance: null,
  @attr('big-number') pending: null,
  @attr seed: null,

  toString() {
    const id = this.get('id');
    const settings = this.get('settings');
    return get(settings, `wallets.${id}.label`) || id;
  },
});
