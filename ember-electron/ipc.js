const debounceFn = require('debounce-fn');

const log = require('electron-log');

const { downloadAsset } = require('./assets');
const { startDaemon } = require('./daemon');

const downloadStart = ({ sender }, url) => {
  const window = sender.getOwnerBrowserWindow();
  const onProgress = debounceFn((progress = 0) => {
    if (!window.isDestroyed()) {
      window.setProgressBar(progress);
    }

    if (!sender.isDestroyed()) {
      sender.send('download-progress', progress);
    }
  }, { wait: 250, immediate: true });

  return downloadAsset(url, onProgress)
    .then(() => {
      if (!window.isDestroyed()) {
        window.setProgressBar(-1);
      }

      if (!sender.isDestroyed()) {
        sender.send('download-done');
      }
    })
    .catch((err) => {
      log.error('Error downloading asset:', err);
      if (!window.isDestroyed()) {
        window.setProgressBar(-1);
      }

      if (!sender.isDestroyed()) {
        sender.send('download-error', err);
      }
    });
};

const nodeStart = ({ sender }) => {
  startDaemon()
    .then((server) => {
      server.once('close', () => {
        if (!sender.isDestroyed()) {
          sender.send('node-exit');
        }
      });

      if (!sender.isDestroyed()) {
        sender.send('node-ready');
      }
    })
    .catch((err) => {
      log.error('Error starting node:', err);
      if (!sender.isDestroyed()) {
        sender.send('node-error');
      }
    });
};

module.exports = {
  downloadStart,
  nodeStart,
};
