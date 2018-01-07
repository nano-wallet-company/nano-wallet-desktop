import Component from '@ember/component';
import { debounce } from '@ember/runloop';

import { on } from 'ember-decorators/object/evented';

export default Component.extend({
  downloader: null,

  asset: null,
  value: 0,
  onDone: null,

  @on('init')
  addListeners() {
    const downloader = this.get('downloader');
    downloader.on('progress', this, this.onProgress);
    downloader.one('done', this, () => this.set('value', 0));
    downloader.one('done', this, this.onDone);
  },

  @on('willDestroyElement')
  removeListeners() {
    const downloader = this.get('downloader');
    downloader.off('progress', this, this.onProgress);
    downloader.off('done', this, this.onDone);
  },

  onProgress(value) {
    debounce(this, this.updateProgress, value, 250, true);
  },

  updateProgress(value) {
    if (!this.isDestroyed) {
      this.set('value', value);
    }
  },
});
