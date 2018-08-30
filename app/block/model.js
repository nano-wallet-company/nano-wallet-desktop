import DS from 'ember-data';

import { attr, belongsTo } from '@ember-decorators/data';

const { Model } = DS;

export default class BlockModel extends Model {
  @belongsTo({ async: true, inverse: null }) wallet = null;

  @belongsTo('account', { async: true, inverse: 'blocks' }) source = null;

  @attr() destination = null;

  @attr('big-number') amount = null;
}
