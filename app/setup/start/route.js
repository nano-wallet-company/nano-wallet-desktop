import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { inject as service } from '@ember/service';

export default class SetupStartRoute extends Route {
  @service electron;

  beforeModel(...args) {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isDataDownloaded = get(electron, 'isDataDownloaded');
      if (!isDataDownloaded) {
        return this.transitionTo('setup.download', { queryParams: { asset: 'data' } });
      }
    }

    return super.beforeModel(...args);
  }

  model() {
    return this.get('electron').startNode();
  }

  afterModel() {
    return this.transitionTo('setup.index');
  }
}
