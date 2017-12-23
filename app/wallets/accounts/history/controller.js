import Controller from '@ember/controller';
import QueryParams from 'ember-parachute';

import { alias } from '@ember/object/computed';

const PaginationQueryParams = new QueryParams({
  page: {
    defaultValue: 1,
  },
  perPage: {
    defaultValue: 10,
  },
});

export default Controller.extend(PaginationQueryParams.Mixin, {
  // page: alias('queryParamsState.page.value'),
  // perPage: alias('queryParamsState.perPage.value'),
});
