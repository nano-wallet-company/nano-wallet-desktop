import DS from 'ember-data';

import { attr, belongsTo } from '@ember-decorators/data';

const { Model } = DS;

export default class BlockModel extends Model {
  @belongsTo({ async: true, inverse: null }) wallet;

  @belongsTo('account', { async: true, inverse: 'blocks' }) source;

  @attr() destination;

  @attr('big-number', { defaultValue: 0 }) amount;
}
