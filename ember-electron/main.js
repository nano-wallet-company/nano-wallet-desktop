/* eslint-env node */
const environment = process.env.NODE_ENV || process.env.EMBER_ENV || 'production';
process.env.NODE_ENV = environment;
process.env.EMBER_ENV = environment;

if (typeof process.env.ELECTRON_IS_DEV === 'undefined') {
  if (environment === 'development') {
    process.env.ELECTRON_IS_DEV = 1;
  }
}

const log = require('electron-log');
const unhandled = require('electron-unhandled');
const { is, appLaunchTimestamp } = require('electron-util');

log.transports.file.level = 'info';
log.transports.rendererConsole.level = 'info';

// Handle an unhandled error in the main thread
//
// Note that 'uncaughtException' is a crude mechanism for exception handling intended to
// be used only as a last resort. The event should not be used as an equivalent to
// "On Error Resume Next". Unhandled exceptions inherently mean that an application is in
// an undefined state. Attempting to resume application code without properly recovering
// from the exception can cause additional unforeseen and unpredictable issues.
//
// Attempting to resume normally after an uncaught exception can be similar to pulling out
// of the power cord when upgrading a computer -- nine out of ten times nothing happens -
// but the 10th time, the system becomes corrupted.
//
// The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated
// resources (e.g. file descriptors, handles, etc) before shutting down the process. It is
// not safe to resume normal operation after 'uncaughtException'.
unhandled({
  logger(...args) {
    return log.error(...args);
  },
});

// https://github.com/electron-archive/grunt-electron-installer#handling-squirrel-events
if (process.platform === 'win32') {
  // eslint-disable-next-line global-require
  if (require('electron-squirrel-startup')) {
    return;
  }
}

const path = require('path');

const del = require('del');
const semver = require('semver');
const locale2 = require('locale2');
const makeDir = require('make-dir');
const pathExists = require('path-exists');

const electron = require('electron');
const debug = require('electron-debug');
const Store = require('electron-store');
const contextMenu = require('electron-context-menu');
const protocolServe = require('electron-protocol-serve');
const { default: installExtension, EMBER_INSPECTOR } = require('electron-devtools-installer');

const updateElectronApp = require('update-electron-app');

const { createWindow } = require('./window');
const { downloadStart, nodeStart } = require('./ipc');

const { version, productName } = require('../package');

const {
  app,
  ipcMain,
  protocol,
  autoUpdater,
} = electron;

let mainWindow = null;

const shouldQuit = !app.requestSingleInstanceLock();
if (shouldQuit) {
  app.quit();
  return;
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

const basePath = is.development ? __dirname : path.join(process.resourcesPath, 'app.asar.unpacked', 'ember-electron');
global.environment = environment;
global.dataPath = path.normalize(app.getPath('userData'));
global.resourcesPath = path.normalize(path.join(basePath, 'resources'));
global.locale = null;
global.isDataDownloaded = false;
global.isNodeStarted = false;
global.isQuitting = false;
global.isUpdating = false;
global.authorizationToken = null;

app.on('before-quit', () => {
  global.isQuitting = true;
});

app.on('window-all-closed', () => {
  if (!is.macos) {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow) {
    mainWindow.show();
  }
});

ipcMain.on('download-start', downloadStart);
ipcMain.on('node-start', nodeStart);

// Registering a protocol & schema to serve our Ember application
const protocolServeName = protocolServe({
  app,
  protocol,
  cwd: path.join(__dirname || path.resolve(path.dirname('')), '..', 'ember'),
});

protocol.registerStandardSchemes([protocolServeName], { secure: true });

// Uncomment the lines below to enable Electron's crash reporter
// For more information, see http://electron.atom.io/docs/api/crash-reporter/
// electron.crashReporter.start({
//     productName: 'YourName',
//     companyName: 'YourCompany',
//     submitURL: 'https://your-domain.com/url-to-submit',
//     autoSubmit: true
// });

const run = async () => {
  log.info(`Starting application: ${productName} ${version} (${environment})`);

  await app.whenReady();

  autoUpdater.on('checking-for-update', () => {
    global.isUpdating = false;
  });

  autoUpdater.on('update-downloaded', () => {
    global.isUpdating = true;
  });

  if (!is.development) {
    updateElectronApp({
      logger: log,
      updateInterval: '30 minutes',
    });
  }

  const store = new Store({ name: 'settings' });
  if (!store.has('dataPath')) {
    store.set('dataPath', global.dataPath);
  }

  let dataPath = path.normalize(store.get('dataPath'));
  if (!path.isAbsolute(dataPath)) {
    dataPath = path.resolve(path.relative(app.getPath('userData'), dataPath));
  }

  await makeDir(dataPath);

  const storeVersion = store.get('version');
  if (!storeVersion || semver.gt(version, storeVersion)) {
    const outdatedAssets = ['config.json', 'log'];
    log.info('Deleting outdated assets:', outdatedAssets.join(', '));
    await del(outdatedAssets, { force: true, cwd: dataPath });
  }

  store.set('version', version);

  Object.defineProperty(global, 'dataPath', { value: dataPath });

  Object.defineProperty(global, 'locale', {
    get() {
      return app.getLocale() || locale2 || null;
    },
  });

  Object.defineProperty(global, 'locale', {
    get() {
      return app.getLocale() || locale2 || null;
    },
  });

  const databasePath = path.join(dataPath, 'data.ldb');
  Object.defineProperty(global, 'isDataDownloaded', {
    get() {
      return pathExists.sync(databasePath);
    },
  });

  if (is.development) {
    await installExtension(EMBER_INSPECTOR);
  }

  mainWindow = await createWindow();

  mainWindow.on('unresponsive', () => {
    log.warn('Application window has become unresponsive:', mainWindow.getTitle());
  });

  mainWindow.on('responsive', () => {
    log.info('Application window has become responsive again:', mainWindow.getTitle());
  });

  mainWindow.once('ready-to-show', () => {
    const elapsed = Date.now() - appLaunchTimestamp;
    log.info(`Application window ready to show (took ${elapsed}ms):`, mainWindow.getTitle());
    mainWindow.show();
  });

  const emberAppLocation = 'serve://dist';

  // Load the ember application using our custom protocol/scheme
  mainWindow.loadURL(emberAppLocation);

  // If a loading operation goes wrong, we'll send Electron back to
  // Ember App entry point
  mainWindow.webContents.on('did-fail-load', () => {
    if (!mainWindow.isDestroyed()) {
      mainWindow.loadURL(emberAppLocation);
    }
  });

  mainWindow.webContents.on('crashed', () => {
    log.error('Application in window has crashed:', mainWindow.getTitle());
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
};

debug({ showDevTools: true });
contextMenu();

module.exports = run();
