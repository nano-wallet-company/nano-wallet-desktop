import isElectron from '../utils/is-electron';

const logger = console;

function electronLog(level, ...args) {
  const fn = typeof logger[level] === 'function'
    ? logger[level].bind(logger)
    : logger.log.bind(logger);
  return fn('<ELECTRON>', ...args);
}

export function initialize(/* application */) {
  if (isElectron()) {
    // eslint-disable-next-line no-undef
    const { ipcRenderer } = requireNode('electron');
    ipcRenderer.on('__ELECTRON_LOG_RENDERER__', electronLog);
  }
}

export default {
  initialize,
};
