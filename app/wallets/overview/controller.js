import Controller from '@ember/controller';

import PaginationMixin from '../../mixins/pagination';

export default Controller.extend(PaginationMixin, {
  hideHistory: true,
  expand: false,
  shrink: false,
  expanded: false,
  firstTime: true,
});
