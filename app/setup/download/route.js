import Route from '@ember/routing/route';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

const nextAssets = ['database'];

export default Route.extend({
  @service downloader: null,

  queryParams: {
    asset: {
      refreshModel: true,
    },
  },

  model({ asset }) {
    return this.get('downloader').download(asset);
  },

  @action
  downloaded() {
    const asset = nextAssets.pop();
    if (!asset) {
      return this.transitionTo('setup.index');
    }

    return this.transitionTo('setup.download', { queryParams: { asset } });
  },
});
