const keytar = require('keytar');
const debounceFn = require('debounce-fn');

const electron = require('electron');
const log = require('electron-log');

const { downloadAsset } = require('./assets');
const { startDaemon } = require('./daemon');

const { productName } = require('../package');

const { ipcMain } = electron;

const downloadStart = ({ sender }, url) => {
  const window = sender.getOwnerBrowserWindow();
  const onProgress = debounceFn(
    (progress = 0) => {
      if (!window.isDestroyed()) {
        window.setProgressBar(progress);
      }

      if (!sender.isDestroyed()) {
        sender.send('download-progress', progress);
      }
    },
    { wait: 250, immediate: true },
  );

  const onStarted = item => {
    const cancelDownload = () => item.cancel();
    ipcMain.once('window-unloading', cancelDownload);
    item.once('done', () => ipcMain.removeListener('window-unloading', cancelDownload));
  };

  return downloadAsset(sender, url, onStarted, onProgress)
    .then(() => {
      if (!window.isDestroyed()) {
        window.setProgressBar(-1);
      }

      if (!sender.isDestroyed()) {
        sender.send('download-done');
      }
    })
    .catch(err => {
      log.error('Error downloading asset:', err);
      if (!window.isDestroyed()) {
        window.setProgressBar(-1);
      }

      if (!sender.isDestroyed()) {
        sender.send('download-error', err);
      }
    });
};

const nodeStart = ({ sender }) =>
  startDaemon()
    .then(server => {
      server.once('close', () => {
        if (!sender.isDestroyed()) {
          sender.send('node-exit');
        }
      });

      if (!sender.isDestroyed()) {
        sender.send('node-ready');
      }
    })
    .catch(err => {
      log.error('Error starting node:', err);
      if (!sender.isDestroyed()) {
        sender.send('node-error');
      }
    });

const keychainGet = ({ sender }, key) => {
  const { useKeychain } = global;
  if (!useKeychain) {
    if (!sender.isDestroyed()) {
      sender.send('keychain-get-done', null);
    }
  }

  keytar
    .getPassword(productName, key)
    .then(value => {
      if (!sender.isDestroyed()) {
        sender.send('keychain-get-done', value);
      }
    })
    .catch(err => {
      log.error('Error retrieving keychain value:', err);
      if (!sender.isDestroyed()) {
        sender.send('keychain-get-error');
      }
    });
};

const keychainSet = ({ sender }, key, value) => {
  const { useKeychain } = global;
  if (!useKeychain) {
    if (!sender.isDestroyed()) {
      sender.send('keychain-set-done');
    }
  }

  keytar
    .setPassword(productName, key, value)
    .then(() => {
      if (!sender.isDestroyed()) {
        sender.send('keychain-set-done');
      }
    })
    .catch(err => {
      log.error('Error setting keychain value:', err);
      if (!sender.isDestroyed()) {
        sender.send('keychain-set-error');
      }
    });
};

const keychainDelete = ({ sender }, key) => {
  const { useKeychain } = global;
  if (!useKeychain) {
    if (!sender.isDestroyed()) {
      sender.send('keychain-delete-done', false);
    }
  }

  keytar
    .deletePassword(productName, key)
    .then(result => {
      if (!sender.isDestroyed()) {
        sender.send('keychain-delete-done', result);
      }
    })
    .catch(err => {
      log.error('Error deleting keychain value:', err);
      if (!sender.isDestroyed()) {
        sender.send('keychain-delete-error');
      }
    });
};

module.exports = {
  downloadStart,
  nodeStart,
  keychainGet,
  keychainSet,
  keychainDelete,
};
