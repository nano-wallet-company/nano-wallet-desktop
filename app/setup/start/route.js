import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service electron: null,

  beforeModel(...args) {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeDownloaded = get(electron, 'isNodeDownloaded');
      if (!isNodeDownloaded) {
        return this.transitionTo('setup.download', { queryParams: { asset: 'node' } });
      }

      const isDataDownloaded = get(electron, 'isDataDownloaded');
      if (!isDataDownloaded) {
        return this.transitionTo('setup.download', { queryParams: { asset: 'data' } });
      }
    }

    return this._super(...args);
  },

  model() {
    return this.get('electron').startNode();
  },

  afterModel() {
    return this.transitionTo('setup.index');
  },
});
