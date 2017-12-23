import Mixin from '@ember/object/mixin';
import { get, set, computed } from '@ember/object'
import { alias, oneWay } from '@ember/object/computed';

import pagedArray from 'ember-cli-pagination/computed/paged-array';

import {
  DEFAULT_PAGE as page,
  DEFAULT_PER_AGE as perPage
} from './pagination';

export default Mixin.create({
  page,
  perPage,

  contentKey: 'content',

  content: computed('contentKey', {
    get() {
      const contentKey = get(this, 'contentKey');
      return get(this, contentKey);
    },

    set(key, value) {
      const contentKey = get(this, 'contentKey');
      return set(this, contentKey, value);
    }
  }),

  pagedContent: pagedArray('content', {
    page: alias('parent.page'),
    perPage: alias('parent.perPage'),
  }),

  totalPages: oneWay('pagedContent.totalPages'),
});
