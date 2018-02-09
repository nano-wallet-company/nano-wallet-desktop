import DS from 'ember-data';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';

import { attr, hasMany, belongsTo } from 'ember-decorators/data';

export default DS.Model.extend({
  @service settings: null,

  @belongsTo() wallet: null,

  @hasMany({ async: true, inverse: 'source' }) blocks: null,
  @hasMany({ async: true, inverse: 'source' }) history: null,

  @attr('big-number') balance: null,
  @attr('big-number') pending: null,

  toString() {
    const id = this.get('id');
    const wallet = this.get('wallet.id');
    const settings = this.get('settings');
    return get(settings, `wallets.${wallet}.accounts.${id}.label`) || id;
  },
});
