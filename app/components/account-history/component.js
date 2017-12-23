import Component from '@ember/component';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

import { alias, oneWay } from '@ember/object/computed';

export default Component.extend({
  wallet: null,
  account: null,
  history: null,

  page: 1,
  perPage: 10,

  pagedContent: pagedArray('history', {
    page: alias('parent.page'),
    perPage: alias('parent.perPage'),
  }),

  totalPages: oneWay('pagedContent.totalPages'),
});
