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
      const isDatabaseDownloaded = electron.isDatabaseDownloaded();
      if (!isNodeDownloaded || !isDatabaseDownloaded) {
        return this.transitionTo('setup.download');
      }
    }
  },

  model() {
    return this.get('electron').startNode();
  },

  afterModel() {
    return this.transitionTo('index');
  },
});
