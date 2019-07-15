import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SetupDownloadRoute extends Route {
  @service electron;

  queryParams = {
    asset: {
      refreshModel: true,
    },
  };

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
