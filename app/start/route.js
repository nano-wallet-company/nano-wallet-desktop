import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { inject as service } from '@ember/service';

export default class StartRoute extends Route {
  @service session;

  @service electron;

  beforeModel(...args) {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isDataDownloaded = get(electron, 'isDataDownloaded');
      if (!isDataDownloaded) {
        return this.transitionTo('setup.start');
      }
    }

    return super.beforeModel(...args);
  }

  model() {
    return this.get('electron').startNode();
  }

  afterModel() {
    return this.transitionTo('index');
  }
}
