import Mixin from '@ember/object/mixin';

import { computed } from 'ember-decorators/object';
import { alias, oneWay } from 'ember-decorators/object/computed';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

import {
  DEFAULT_PAGE as page,
  DEFAULT_PER_AGE as perPage,
} from './pagination';

export default Mixin.create({
  page,
  perPage,

  contentKey: 'content',

  @computed('contentKey')
  get content() {
    const contentKey = this.get('contentKey');
    return this.get(contentKey);
  },

  pagedContent: pagedArray('content', {
    @alias('parent.page') page,
    @alias('parent.perPage') perPage,
  }),

  @oneWay('pagedContent.totalPages') totalPages: 0,
});
