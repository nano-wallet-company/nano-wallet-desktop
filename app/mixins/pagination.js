import QueryParams from 'ember-parachute';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;

const PaginationQueryParams = new QueryParams({
  page: {
    defaultValue: DEFAULT_PAGE,
  },
  perPage: {
    defaultValue: DEFAULT_PER_PAGE,
  },
});

export default PaginationQueryParams.Mixin;
