import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service session: null,
  @service electron: null,

  beforeModel(...args) {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeDownloaded = get(electron, 'isNodeDownloaded');
      const isDataDownloaded = get(electron, 'isDataDownloaded');
      if (!isNodeDownloaded || !isDataDownloaded) {
        return this.transitionTo('setup.start');
      }
    }

    return this._super(...args);
  },

  model() {
    return this.get('electron').startNode();
  },

  afterModel() {
    return this.transitionTo('index');
  },
});
