import Route from '@ember/routing/route';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

export default Route.extend({
  @service electron: null,

  queryParams: {
    asset: {
      refreshModel: true,
    },
  },

  // eslint-disable-next-line consistent-return
  beforeModel() {
    const electron = this.get('electron');
    const isNodeDownloaded = electron.isNodeDownloaded();
    const isDataDownloaded = electron.isDataDownloaded();
    if (isNodeDownloaded && isDataDownloaded) {
      return this.transitionTo('setup.start');
    }
  },

  model({ asset }) {
    return this.get('electron').download(asset);
  },

  @action
  downloaded() {
    return this.transitionTo('setup.start');
  },

  @action
  error(err) {
    return this.transitionTo('error', err);
  },
});
