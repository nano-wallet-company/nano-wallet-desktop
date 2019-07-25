import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { get, action } from '@ember/object';

import { inject as service } from '@ember/service';

export default class WalletsOverviewAccountsRoute extends Route {
  @service router;

  @action
  changeSlide(sortedAccounts, slide) {
    const router = this.get('router');
    const currentRouteName = get(router, 'currentRouteName');
    const account = A(sortedAccounts).objectAt(slide);
    if (account) {
      return this.transitionTo(currentRouteName, account, { queryParams: { slide } });
    }

    return this.transitionTo({ queryParams: { slide } });
  }
}
