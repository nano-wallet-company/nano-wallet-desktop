import Component from '@ember/component';

import PagedMixin from '../../mixins/paged';

export default Component.extend(PagedMixin, {
  contentKey: 'history',

  wallet: null,
  account: null,
  history: null,
});
