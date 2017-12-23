import DS from 'ember-data';

import { attr, belongsTo } from 'ember-decorators/data';

export default DS.Model.extend({
  @belongsTo({ inverse: null }) wallet: null,
  @belongsTo('account', { inverse: 'blocks' }) source: null,

  @attr('big-number') destination: null,
  @attr('big-number') amount: null,
});
