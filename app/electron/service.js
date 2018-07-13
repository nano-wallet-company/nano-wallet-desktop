import Service from '@ember/service';
import Evented from '@ember/object/evented';
import { get, computed } from '@ember/object';

import { Promise } from 'rsvp';

import window from 'ember-window-mock';
import { defineError } from 'ember-exex/error';
import { DisposableMixin, addEventListener } from 'ember-lifeline';
import { service } from 'ember-decorators/service';
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

export default Service.extend(Evented, DisposableMixin, {
  @service intl: null,
  @service config: null,

  shell: null,
  remote: null,
  ipcRenderer: null,

  isElectron: computed({
    get() {
      return isElectron();
    },
  }).volatile(),

  platform: computed({
    get() {
      return getPlatform();
    },
  }).volatile(),

  @on('init')
  setup() {
    if (isElectron()) {
      // eslint-disable-next-line no-undef
      const { shell, remote, ipcRenderer } = requireNode('electron');
      this.shell = shell;
      this.remote = remote;
      this.ipcRenderer = ipcRenderer;

      addEventListener(this, window, 'beforeunload', () => this.ipcRenderer.send('window-unloading'));

      const onDownloadProgress = this.onDownloadProgress.bind(this);
      const onDownloadVerify = this.onDownloadVerify.bind(this);
      const onDownloadExtract = this.onDownloadExtract.bind(this);
      const onDownloadDone = this.onDownloadDone.bind(this);
      const onNodeExit = this.onNodeExit.bind(this);
      this.registerDisposable(() => {
        ipcRenderer.removeListener('download-progress', onDownloadProgress);
        ipcRenderer.removeListener('download-verify', onDownloadVerify);
        ipcRenderer.removeListener('download-extract', onDownloadExtract);
        ipcRenderer.removeListener('download-done', onDownloadDone);
        ipcRenderer.removeListener('node-exit', onNodeExit);
      });

      ipcRenderer.on('download-progress', onDownloadProgress);
      ipcRenderer.on('download-verify', onDownloadVerify);
      ipcRenderer.on('download-extract', onDownloadExtract);
      ipcRenderer.on('download-done', onDownloadDone);
      ipcRenderer.on('node-exit', onNodeExit);
    }

    return this;
  },

  getRemoteGlobal(key, defaultValue) {
    return (this.get('isElectron') && this.remote.getGlobal(key)) || defaultValue;
  },

  locale: computed('remote', 'intl.locale', {
    get() {
      const defaultLocale = this.get('intl.locale');
      return this.getRemoteGlobal('locale', defaultLocale);
    },
  }).volatile(),

  isDataDownloaded: computed('remote', {
    get() {
      return this.getRemoteGlobal('isDataDownloaded', false);
    },
  }).volatile(),

  isNodeStarted: computed('remote', {
    get() {
      return this.getRemoteGlobal('isNodeStarted', false);
    },
  }).volatile(),

  authorizationToken: computed('remote', {
    get() {
      return this.getRemoteGlobal('authorizationToken', null);
    },
  }).volatile(),

  openExternal(...args) {
    return this.shell.openExternal(...args);
  },

  download(key) {
    return new Promise((resolve, reject) => {
      const config = this.get('config');
      const ipcRenderer = this.get('ipcRenderer');
      const assets = get(config, 'assets');
      const { url } = get(assets, key);
      ipcRenderer.once('download-error', () => reject(new DownloadError()));
      ipcRenderer.once('download-progress', () => resolve(this));
      ipcRenderer.once('download-done', this.onDownloadDone.bind(this));
      ipcRenderer.send('download-start', url);
    });
  },

  startNode() {
    return new Promise((resolve, reject) => {
      const ipcRenderer = this.get('ipcRenderer');
      ipcRenderer.once('node-error', () => reject(new NodeError()));
      ipcRenderer.once('node-ready', () => resolve(this));
      ipcRenderer.send('node-start');
    });
  },

  onWillUnload() {
    return this.runTask(() => {
      const ipcRenderer = this.get('ipcRenderer');
      ipcRenderer.send('will-unload');
      this.trigger('unloading');
    });
  },

  onNodeExit() {
    this.trigger('exit');
  },

  onDownloadProgress(event, progress) {
    this.trigger('progress', parseFloat(progress));
  },

  onDownloadExtract() {
    this.trigger('extract');
  },

  onDownloadVerify() {
    this.trigger('verify');
  },

  onDownloadDone() {
    this.trigger('done');
  },
});
