import console from 'console';
import isElectron from '../utils/is-electron';

function electronLog(level, ...args) {
  // eslint-disable-next-line security/detect-object-injection
  const fn = typeof console[level] === 'function' ? ::console[level] : ::console.log;
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
