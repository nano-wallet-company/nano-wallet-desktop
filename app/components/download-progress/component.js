import Component from '@ember/component';
import { debounce } from '@ember/runloop';

import { on } from 'ember-decorators/object/evented';

export const STATUS_DOWNLOADING = 'downloading';
export const STATUS_VERIFYING = 'verifying';
export const STATUS_EXTRACTING = 'extracting';

export default Component.extend({
  downloader: null,

  status: STATUS_DOWNLOADING,
  asset: null,
  progress: 0,
  onDone: null,

  @on('init')
  addListeners() {
    const downloader = this.get('downloader');
    downloader.on('error', this, this.onError);
    downloader.on('progress', this, this.onProgress);
    downloader.on('verify', this, this.onVerify);
    downloader.on('extract', this, this.onExtract);
    downloader.on('done', this, this.reset);
    downloader.on('done', this, this.onDone);
  },

  @on('willDestroyElement')
  removeListeners() {
    const downloader = this.get('downloader');
    downloader.off('error', this, this.onError);
    downloader.off('progress', this, this.onProgress);
    downloader.off('verify', this, this.onVerify);
    downloader.off('extract', this, this.onExtract);
    downloader.off('done', this, this.reset);
    downloader.off('done', this, this.onDone);
  },

  onProgress(value) {
    debounce(this, this.updateProgress, value, 250, true);
  },

  onVerify() {
    this.reset(STATUS_VERIFYING);
  },

  onExtract() {
    this.reset(STATUS_EXTRACTING);
  },

  reset(status = STATUS_DOWNLOADING) {
    if (!this.isDestroying) {
      this.setProperties({
        status,
        progress: 1,
      });
    }
  },

  updateProgress(value) {
    if (!this.isDestroying) {
      this.set('progress', value);
    }
  },
});
