import Service from '@ember/service';
import Evented from '@ember/object/evented';
import { get } from '@ember/object';

import { Promise } from 'rsvp';
import { defineError } from 'ember-exex/error';
import { service } from 'ember-decorators/service';
import { computed } from 'ember-decorators/object';
import { on } from 'ember-decorators/object/evented';

import isElectron from '../utils/is-electron';
import getPlatform from '../utils/get-platform';

const ElectronError = defineError({
  name: 'ElectronError',
  message: 'Encountered an error during Electron IPC',
});

const DownloadError = defineError({
  name: 'DownloadError',
  message: 'Encountered an error during download',
  extends: ElectronError,
});

const NodeError = defineError({
  name: 'NodeError',
  message: 'Wallet node encountered an error',
  extends: ElectronError,
});

export default Service.extend(Evented, {
  @service config: null,

  remote: null,
  ipcRenderer: null,

  @computed
  get isElectron() {
    return isElectron();
  },

  @computed
  get platform() {
    return getPlatform();
  },

  @on('init')
  setup() {
    if (isElectron()) {
      // eslint-disable-next-line no-undef
      const { remote, ipcRenderer } = requireNode('electron');
      this.remote = remote;
      this.ipcRenderer = ipcRenderer;
      this.ipcRenderer.on('node-error', this.onNodeError.bind(this));
      this.ipcRenderer.on('download-error', this.onDownloadError.bind(this));
      this.ipcRenderer.on('download-progress', this.onDownloadProgress.bind(this));
    }
  },

  getRemoteGlobal(key, defaultValue) {
    return (this.get('isElectron') && this.remote.getGlobal(key)) || defaultValue;
  },

  isNodeDownloaded() {
    return this.getRemoteGlobal('isNodeDownloaded', false);
  },

  isDataDownloaded() {
    return this.getRemoteGlobal('isDataDownloaded', false);
  },

  isNodeStarted() {
    return this.getRemoteGlobal('isNodeStarted', false);
  },

  authorizationToken() {
    return this.getRemoteGlobal('authorizationToken', false);
  },

  download(asset) {
    return new Promise((resolve) => {
      const config = this.get('config');
      const platform = this.get('platform');
      const ipcRenderer = this.get('ipcRenderer');
      const { url, integrity } = get(config, `assets.${asset}.${platform}`);
      ipcRenderer.once('download-progress', () => resolve(this));
      ipcRenderer.once('download-done', this.onDownloadFinished.bind(this));
      ipcRenderer.send('download-start', url, integrity);
    });
  },

  startNode() {
    return new Promise((resolve) => {
      const ipcRenderer = this.get('ipcRenderer');
      ipcRenderer.once('node-ready', () => resolve(this));
      ipcRenderer.send('node-start');
    });
  },

  onNodeError(event, err) {
    this.trigger('error', new NodeError(err));
  },

  onDownloadError(event, err) {
    this.trigger('error', new DownloadError(err));
  },

  onDownloadProgress(event, progress) {
    this.trigger('progress', parseFloat(progress));
  },

  onDownloadFinished() {
    this.trigger('done');
  },
});
