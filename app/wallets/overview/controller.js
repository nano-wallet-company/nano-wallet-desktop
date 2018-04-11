import Controller from '@ember/controller';

import { computed } from 'ember-decorators/object';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  queryParams: ['slide', 'currency'],
  slide: 0,
  currency: 'NANO',

  hideHistory: true,
  expand: false,
  shrink: false,
  expanded: false,
  firstTime: true,

  sortedAccounts: sort('model.accounts', 'sortBy'),

  @computed()
  get sortBy() {
    // Fallback to sorting by `id` for stable sort.
    return ['modifiedTimestamp', 'id'];
  },
});
