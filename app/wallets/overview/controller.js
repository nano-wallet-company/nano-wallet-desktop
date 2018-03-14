import Controller from '@ember/controller';

import { computed } from 'ember-decorators/object';
import { sort } from '@ember/object/computed';

export default Controller.extend({
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
