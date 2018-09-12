import Route from '@ember/routing/route';

import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class SetupDownloadRoute extends Route {
  @service electron = null;

  queryParams = {
    asset: {
      refreshModel: true,
    },
  }

  model({ asset }) {
    return this.get('electron').download(asset);
  }

  @action
  downloaded() {
    return this.transitionTo('setup.start');
  }

  @action
  error(err) {
    return this.transitionTo('error', err);
  }
}
