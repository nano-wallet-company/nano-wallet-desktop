/* eslint-env node */
/* eslint-disable no-console */
const os = require('os');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const { spawn } = require('child_process');

const ssri = require('ssri');
const spdy = require('spdy');
const helmet = require('helmet');
const connect = require('connect');
const getPort = require('get-port');
const httpProxy = require('http-proxy');
const selfsigned = require('selfsigned');
const debounceFn = require('debounce-fn');
const extractZip = require('extract-zip');
const pathExists = require('path-exists');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const normalizeNewline = require('normalize-newline');
const toExecutableName = require('to-executable-name');

const {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
} = require('electron');

if (typeof process.env.ELECTRON_IS_DEV === 'undefined') {
  const env = process.env.NODE_ENV || process.env.EMBER_ENV;
  if (env === 'development') {
    process.env.ELECTRON_IS_DEV = 1;
  }
}

const isDev = require('electron-is-dev');
const log = require('electron-log');
const debug = require('electron-debug');
const unhandled = require('electron-unhandled');
const contextMenu = require('electron-context-menu');
const protocolServe = require('electron-protocol-serve');
const { download } = require('electron-dl');
const { appReady } = require('electron-util');
const { default: installExtension, EMBER_INSPECTOR } = require('electron-devtools-installer');

const { productName: tabbingIdentifier } = require('../package');

let mainWindow = null;

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

// Registering a protocol & schema to serve our Ember application
protocol.registerStandardSchemes(['serve'], { secure: true });
protocolServe({
  app,
  protocol,
  cwd: path.join(__dirname || path.resolve(path.dirname('')), '..', 'ember'),
});

// Uncomment the lines below to enable Electron's crash reporter
// For more information, see http://electron.atom.io/docs/api/crash-reporter/
// electron.crashReporter.start({
//     productName: 'YourName',
//     companyName: 'YourCompany',
//     submitURL: 'https://your-domain.com/url-to-submit',
//     autoSubmit: true
// });

global.isNodeStarted = false;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const extract = promisify(extractZip);

const downloadAsset = async (sender, url, integrity, onProgress) => {
  const directory = path.resolve(app.getPath('temp'));
  log.info('Downloading asset:', url);

  const dl = await download(sender, url, { directory, onProgress });
  const savePath = dl.getSavePath();
  if (!sender.isDestroyed()) {
    sender.send('download-verify');
  }

  log.info('Verifying asset:', savePath, integrity);
  await ssri.checkStream(fs.createReadStream(savePath), integrity);

  const dir = path.resolve(app.getPath('userData'));
  if (!sender.isDestroyed()) {
    sender.send('download-extract');
  }

  log.info('Extracting asset:', savePath, '->', dir);
  await extract(savePath, { dir });

  log.info('Asset download done:', url);
};

ipcMain.on('download-start', ({ sender }, url, integrity) => {
  const onProgress = debounceFn((progress) => {
    if (!sender.isDestroyed()) {
      sender.send('download-progress', progress || 0);
    }
  }, { wait: 250, immediate: true });

  // sender.webContents.session.once('will-download', (event, item) => {
  //   if (!sender.isDestroyed()) {
  //     sender.once('close', () => item.pause());
  //   }
  // });

  return downloadAsset(sender, url, integrity, onProgress)
    .then(() => {
      if (!sender.isDestroyed()) {
        sender.send('download-done');
      }
    })
    .catch((err) => {
      log.error('Error downloading asset:', err);
      if (!sender.isDestroyed()) {
        sender.send('download-error', err);
      }
    });
});

ipcMain.on('node-start', ({ sender }) => {
  const cwd = path.resolve(app.getPath('userData'));
  const cmd = path.join(cwd, toExecutableName('rai_node'));
  const child = spawn(cmd, ['--daemon', '--data_path', cwd], {
    cwd,
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.on('error', (err) => {
    log.error('[node]', 'Error starting:', err);
    if (!sender.isDestroyed()) {
      sender.send('node-error', err);
    }
  });

  child.stdout.on('data', data => log.info('[node]', data.toString()));
  child.stderr.on('data', data => log.error('[node]', data.toString()));

  const {
    rpc: {
      port,
      address: host,
    },
  } = loadJsonFile.sync(path.join(cwd, 'config.json'));

  const proxy = httpProxy.createProxyServer({
    target: { host, port },
    xfwd: true,
  });

  const connectApp = connect();
  connectApp.use(helmet());
  connectApp.use((req, res, next) => proxy.web(req, res, { ignorePath: true }, next));

  // eslint-disable-next-line no-unused-vars
  connectApp.use((err, req, res, next) => log.error('[proxy]', err));

  const pems = selfsigned.generate([{ name: 'commonName', value: 'nano.org' }]);
  const key = normalizeNewline(pems.private);
  const cert = normalizeNewline(pems.cert);
  const server = spdy.createServer({ key, cert }, connectApp);
  const onCertificateError = (event, webContents, url, error, { data }, callback) => {
    const isTrusted = data === cert;
    if (isTrusted) {
      event.preventDefault();
    }

    return callback(isTrusted);
  };

  app.on('certificate-error', onCertificateError);

  server.once('close', () => {
    log.info('[proxy]', 'Server closing');
    app.removeListener('certificate-error', onCertificateError);
    child.kill();
  });

  child.once('close', () => {
    log.info('[node]', 'Node exited');
    server.close();
  });

  mainWindow.once('close', () => {
    server.close();
    child.kill();
  });

  Object.defineProperty(global, 'isNodeStarted', {
    get() {
      return server.listening && !child.killed;
    },
  });

  log.info('[proxy] Starting server');
  server.listen(17076, '::1', function Server(err) {
    if (err) {
      log.error('[proxy]', 'Error starting server:', err);
      return err;
    }

    const { port: listenPort } = this.address();
    log.info('[proxy]', `Server listening on port ${listenPort}`);
    if (!sender.isDestroyed()) {
      sender.send('node-ready');
    }
  });
});

const run = async () => {
  const dataPath = path.resolve(app.getPath('userData'));
  const configPath = path.join(dataPath, 'config.json');
  let config = {};
  try {
    config = await loadJsonFile(configPath);
  } catch (err) {
    config = await loadJsonFile(path.join(__dirname, 'config.json'));
  }

  config.rpc.port = await getPort({ port: config.rpc.port });
  config.node.peering_port = await getPort({ port: config.node.peering_port });

  const cpuCount = os.cpus().length;
  config.node.io_threads = cpuCount;
  config.node.work_threads = cpuCount;

  const authorizationToken = crypto.randomBytes(20).toString('hex');
  global.authorizationToken = authorizationToken;
  config.rpc.authorization_token = authorizationToken;

  log.info('Writing node configuration:', configPath);
  await writeJsonFile(configPath, config, {
    replacer(key, value) {
      return typeof value === 'number' ? String(value) : value;
    },
  });

  await appReady;

  const nodePath = path.join(dataPath, toExecutableName('rai_node'));
  Object.defineProperty(global, 'isNodeDownloaded', {
    get() {
      return pathExists.sync(nodePath);
    },
  });

  const databasePath = path.join(dataPath, 'data.ldb');
  Object.defineProperty(global, 'isDataDownloaded', {
    get() {
      return pathExists.sync(databasePath);
    },
  });

  mainWindow = new BrowserWindow({
    tabbingIdentifier,
    width: 1366,
    height: 768,
    minWidth: 240,
    minHeight: 320,
    // frame: false,
    center: true,
    darkTheme: true,
    transparent: true,
    scrollBounce: true,
    // vibrancy: 'dark',
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#000034',
  });

  contextMenu({
    window: mainWindow,
    showInspectElement: true,
  });

  if (isDev) {
    await installExtension(EMBER_INSPECTOR);
  }

  const emberAppLocation = 'serve://dist';

  // Load the ember application using our custom protocol/scheme
  mainWindow.loadURL(emberAppLocation);

  // If a loading operation goes wrong, we'll send Electron back to
  // Ember App entry point
  mainWindow.webContents.on('did-fail-load', () => {
    mainWindow.loadURL(emberAppLocation);
  });

  mainWindow.webContents.on('crashed', () => {
    log.error('Your Ember app (or other code) in the main window has crashed.');
    log.error('This is a serious issue that needs to be handled and/or debugged.');
  });

  mainWindow.on('unresponsive', () => {
    log.warn('Your Ember app (or other code) has made the window unresponsive.');
  });

  mainWindow.on('responsive', () => {
    log.info('The main window has become responsive again.');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

debug({ showDevTools: true });

run();
