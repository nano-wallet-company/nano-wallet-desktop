import Component from '@ember/component';

import InViewportMixin from 'ember-in-viewport';

import { service } from 'ember-decorators/service';
import { on } from 'ember-decorators/object/evented';

export default Component.extend(InViewportMixin, {
  @service status: null,

  @on('didEnterViewport')
  startPolling() {
    this.get('status').resumePolling();
  },

  @on('willDestroyElement')
  @on('didExitViewport')
  stopPolling() {
    this.get('status').pausePolling();
  },
});
