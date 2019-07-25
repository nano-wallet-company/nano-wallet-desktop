import Component from '@ember/component';
import { get, computed } from '@ember/object';

import InViewportMixin from 'ember-in-viewport';

import { inject as service } from '@ember/service';

import { gt, lt } from '@ember/object/computed';
import { on } from '@ember-decorators/object';

export default class StatusTooltipComponent extends Component.extend(InViewportMixin) {
  @service status;

  @lt('status.peers.length', 1) isPeerless;

  @gt('uncheckedPercentage', 0.01) isSyncing;

  @computed('status.blocks.{count,unchecked}')
  get uncheckedPercentage() {
    const status = this.get('status');
    const count = get(status, 'blocks.count') || 0;
    const unchecked = get(status, 'blocks.unchecked') || 1;
    return (unchecked / count) * 100;
  }

  @on('didEnterViewport')
  startPolling() {
    this.get('status').resumePolling();
  }

  @on('didExitViewport', 'willDestroyElement')
  stopPolling() {
    this.get('status').pausePolling();
  }
}
