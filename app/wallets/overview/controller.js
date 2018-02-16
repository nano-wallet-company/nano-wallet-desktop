import Controller from '@ember/controller';
import { action } from 'ember-decorators/object';

import PaginationMixin from '../../mixins/pagination';

export default Controller.extend(PaginationMixin, {
  showHistory: false,
    @action
  toggleHistory() {
    this.toggleProperty('showHistory');
  },
});
