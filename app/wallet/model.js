import DS from 'ember-data';

import { attr, hasMany } from 'ember-decorators/data';

export default DS.Model.extend({
  @hasMany('account', { async: true }) accounts: null,

  @attr('big-number') balance: null,
  @attr('big-number') pending: null,
});
