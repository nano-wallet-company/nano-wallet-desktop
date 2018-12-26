import DS from 'ember-data';

import { belongsTo, hasMany } from '@ember-decorators/data';

const { Model } = DS;

export default class FrontierModel extends Model {
  @belongsTo('wallet', { async: true, inverse: null }) wallet;

  @belongsTo('account', { async: true, inverse: null }) account;

  @belongsTo('block', { async: true, inverse: 'frontier' }) hash;

  @hasMany('block', { async: true, inverse: 'frontier' }) blocks;
}
