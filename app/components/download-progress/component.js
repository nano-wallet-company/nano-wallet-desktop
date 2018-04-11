import Component from '@ember/component';

import {
  runTask,
  debounceTask,
  runDisposables,
  registerDisposable,
} from 'ember-lifeline';
import { defineError } from 'ember-exex/error';
import { on } from 'ember-decorators/object/evented';

export const STATUS_DOWNLOADING = 'downloading';
export const STATUS_VERIFYING = 'verifying';
export const STATUS_EXTRACTING = 'extracting';

export const DownloadError = defineError({
  name: 'DownloadError',
  message: 'Error downloading {asset}',
});

export default Component.extend({
  downloader: null,

  status: STATUS_DOWNLOADING,
  asset: null,
  value: 0,

  onDone: null,

  willDestroy(...args) {
    runDisposables(this);
    return this._super(...args);
  },

  @on('didInsertElement')
  addListeners() {
    registerDisposable(this, () => {
      const downloader = this.get('downloader');
      downloader.off('error', this, this.onError);
      downloader.off('progress', this, this.onProgress);
      downloader.off('verify', this, this.onVerify);
      downloader.off('extract', this, this.onExtract);
      downloader.off('done', this, this.reset);
      downloader.off('done', this, this.onDone);
    });

    return runTask(this, () => {
      const downloader = this.get('downloader');
      downloader.on('error', this, this.onError);
      downloader.on('progress', this, this.onProgress);
      downloader.on('verify', this, this.onVerify);
      downloader.on('extract', this, this.onExtract);
      downloader.on('done', this, this.reset);
      downloader.on('done', this, this.onDone);
    });
  },

  onError() {
    const asset = this.get('asset');
    throw new DownloadError({ params: { asset } });
  },

  onProgress(value) {
    return debounceTask(this, 'updateProgress', value, 250);
  },

  onVerify() {
    return this.reset(STATUS_VERIFYING);
  },

  onExtract() {
    return this.reset(STATUS_EXTRACTING);
  },

  reset(status = STATUS_DOWNLOADING) {
    return runTask(this, () => {
      this.setProperties({
        status,
        value: 1,
      });
    });
  },

  updateProgress(value) {
    this.set('value', value);
  },
});
