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
    downloader.on('error', this, this.onError);
    downloader.on('progress', this, this.onProgress);
    downloader.on('done', this, () => this.updateProgress(0));
    downloader.on('done', this, this.onDone);
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
    if (!this.isDestroying) {
      this.set('value', value);
    }
  },
});
