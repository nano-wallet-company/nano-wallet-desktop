import Controller from '@ember/controller';

import { sort } from '@ember/object/computed';

export default class WalletsOverviewController extends Controller {
  queryParams = ['slide', 'currency'];

  slide = 0;

  currency = 'NANO';

  hideHistory = true;

  isExpanded = false;

  @sort('model.accounts', 'sortBy') sortedAccounts;

  get sortBy() {
    // Fallback to sorting by `id` for stable sort.
    return ['modifiedTimestamp', 'id'];
  }
}
