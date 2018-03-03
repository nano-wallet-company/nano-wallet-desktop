import Component from '@ember/component';
import { debounce, scheduleOnce } from '@ember/runloop';
import { tryInvoke } from '@ember/utils';

import { computed, observes } from 'ember-decorators/object';

import QRious from 'npm:qrious';

export default Component.extend({
  tagName: 'img',
  attributeBindings: ['src'],

  value: null,
  size: 180,

  qriousInstance: null,

  @computed()
  get src() {
    const value = this.get('value');
    if (!value) {
      return null;
    }

    if (!this.qriousInstance) {
      this.qriousInstance = new QRious();
    }

    const props = this.getProperties('value', 'size');
    tryInvoke(this.qriousInstance, 'set', [props]);
    return this.qriousInstance.toDataURL();
  },

  @observes('value', 'size')
  valuesDidChange() {
    debounce(this, this.triggerRefresh, 250, true);
  },

  triggerRefresh() {
    scheduleOnce('afterRender', this, this.refreshImage);
  },

  refreshImage() {
    if (!this.isDestroying) {
      this.notifyPropertyChange('src');
    }
  },
});
