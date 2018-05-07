import { Model } from 'ember-data';

import { attr, belongsTo } from 'ember-decorators/data';

export default Model.extend({
  @belongsTo({ async: true, inverse: null }) wallet: null,
  @belongsTo('account', { async: true, inverse: 'blocks' }) source: null,

  @attr() destination: null,
  @attr('big-number') amount: null,
});
