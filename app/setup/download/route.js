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

  // beforeModel(...args) {
  //   const electron = this.get('electron');
  //   const isNodeDownloaded = get(electron, 'isNodeDownloaded');
  //   const isDataDownloaded = get(electron, 'isDataDownloaded');
  //   if (isNodeDownloaded && isDataDownloaded) {
  //     return this.transitionTo('setup.start');
  //   }

  //   return this._super(...args);
  // },

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
