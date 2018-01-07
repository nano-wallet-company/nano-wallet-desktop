import Service from '@ember/service';
import Evented from '@ember/object/evented';

import { Promise } from 'rsvp';
import { defineError } from 'ember-exex/error';
import { on } from 'ember-decorators/object/evented';

import isElectron from '../utils/is-electron';

const DownloadError = defineError({
  name: 'DownloadError',
  message: 'Encountered an error during download',
});

export default Service.extend(Evented, {
  ipcRenderer: null,

  @on('init')
  setup() {
    if (isElectron()) {
      // eslint-disable-next-line no-undef
      const { ipcRenderer } = requireNode('electron');
      this.ipcRenderer = ipcRenderer;
      this.ipcRenderer.on('download-progress', this.onProgress.bind(this));
    }
  },

  download(asset) {
    return new Promise((resolve, reject) => {
      const ipcRenderer = this.get('ipcRenderer');
      if (!ipcRenderer) {
        return reject(new DownloadError('Not within an Electron context'));
      }

      ipcRenderer.once('download-error', err => reject(new DownloadError(err)));
      ipcRenderer.once('download-progress', () => resolve(this));
      ipcRenderer.once('download-done', this.onDone.bind(this));
      ipcRenderer.send('download-start', asset);
      return null;
    });
  },

  onProgress(event, progress) {
    this.trigger('progress', parseFloat(progress));
  },

  onDone() {
    this.trigger('done');
  },
});
