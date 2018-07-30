import Controller from '@ember/controller';

import { computed } from 'ember-decorators/object';
import { sort } from 'ember-decorators/object/computed';

export default Controller.extend({
  queryParams: ['slide'],
  slide: 0,

  hideHistory: true,
  isExpanded: false,

  @sort('model.accounts', 'sortBy') sortedAccounts: null,

  @computed
  get sortBy() {
    // Fallback to sorting by `id` for stable sort.
    return ['modifiedTimestamp', 'id'];
  },
});
