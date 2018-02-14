import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';

import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default Mixin.create({
  @service electron: null,

  @action
  loading() {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeStarted = electron.isNodeStarted();
      if (!isNodeStarted) {
        return this.transitionTo('start');
      }
    }

    return true;
  },
});
