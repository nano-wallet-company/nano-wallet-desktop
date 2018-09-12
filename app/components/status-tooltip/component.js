import Component from '@ember/component';
import { get } from '@ember/object';

import InViewportMixin from 'ember-in-viewport';

import { service } from '@ember-decorators/service';
import { on, computed } from '@ember-decorators/object';
import { gt, lt } from '@ember-decorators/object/computed';

export default class StatusTooltipComponent extends Component.extend(
  InViewportMixin,
) {
  @service status = null;

  @lt('status.peers.length', 1) isPeerless = false;

  @gt('uncheckedPercentage', 0.01) isSyncing = false;

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
