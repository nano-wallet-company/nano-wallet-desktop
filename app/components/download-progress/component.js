import Component from '@ember/component';

import { runTask, debounceTask, runDisposables } from 'ember-lifeline';
import { on } from 'ember-decorators/object/evented';

import { defineError } from 'ember-exex/error';

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

  willDestroy(...args) {
    runDisposables(this);
    return this._super(...args);
  },

  onError() {
    const asset = this.get('asset');
    throw new DownloadError({ params: { asset } });
  },

  onProgress(value) {
    debounceTask(this, 'updateProgress', value, 250);
  },

  onVerify() {
    this.reset(STATUS_VERIFYING);
  },

  onExtract() {
    this.reset(STATUS_EXTRACTING);
  },

  reset(status = STATUS_DOWNLOADING) {
    runTask(this, () => {
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
