import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from 'ember-decorators/service';

export default Route.extend({
  @service electron: null,

  // eslint-disable-next-line consistent-return
  beforeModel() {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeDownloaded = electron.isNodeDownloaded();
      if (!isNodeDownloaded) {
        return this.transitionTo('setup.download', { queryParams: { asset: 'node' } });
      }

      const isDataDownloaded = electron.isDataDownloaded();
      if (!isDataDownloaded) {
        return this.transitionTo('setup.download', { queryParams: { asset: 'data' } });
      }
    }
  },

  model() {
    return this.get('electron').startNode();
  },

  afterModel() {
    return this.transitionTo('setup.index');
  },
});
