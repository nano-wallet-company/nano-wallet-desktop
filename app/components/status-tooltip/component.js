import Component from '@ember/component';

import InViewportMixin from 'ember-in-viewport';

import { service } from 'ember-decorators/service';
import { on } from 'ember-decorators/object/evented';
import { gt, lt } from 'ember-decorators/object/computed';

export default Component.extend(InViewportMixin, {
  @service status: null,

  @gt('status.blocks.unchecked', 0) hasUncheckedBlocks: false,
  @lt('status.peers.length', 1) isPeerless: false,

  @on('didEnterViewport')
  startPolling() {
    this.get('status').resumePolling();
  },

  @on('didExitViewport', 'willDestroyElement')
  stopPolling() {
    this.get('status').pausePolling();
  },
});
