/* eslint-env node */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const ssri = require('ssri');
const express = require('express');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
const httpolyglot = require('httpolyglot');
const selfsigned = require('selfsigned');
const decompress = require('decompress');
const debounceFn = require('debounce-fn');
const pathExists = require('path-exists');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const normalizeNewline = require('normalize-newline');

const {
  app,
  protocol,
  Menu,
  BrowserWindow,
  ipcMain,
} = require('electron');
const { download: electronDownload } = require('electron-dl');
const protocolServe = require('electron-protocol-serve');
const log = require('electron-log');
const debug = require('electron-debug');
const isDev = require('electron-is-dev');
const unhandled = require('electron-unhandled');
const { appReady } = require('electron-util');
const { default: installExtension, EMBER_INSPECTOR } = require('electron-devtools-installer');

let mainWindow = null;

global.isNodeStarted = false;

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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const downloadAsset = async (sender, url, integrity, onProgress) => {
  const directory = path.resolve(app.getPath('temp'));
  const dl = await electronDownload(sender, url, { directory, onProgress });
  const savePath = dl.getSavePath();
  await ssri.checkStream(fs.createReadStream(savePath), integrity);
  const dataPath = path.resolve(app.getPath('userData'));
  await decompress(savePath, dataPath);
};

ipcMain.on('download-start', ({ sender }, url, integrity) => {
  const onProgress = debounceFn((progress) => {
    if (!sender.isDestroyed()) {
      sender.send('download-progress', progress);
    }
  }, { wait: 250, immediate: true });

  log.info('Downloading asset:', url, integrity);

  downloadAsset(sender, url, integrity, onProgress)
    .then(() => {
      if (!sender.isDestroyed()) {
        sender.send('download-done');
      }
    })
    .catch((err) => {
      log.error(err);
      if (!sender.isDestroyed()) {
        sender.send('download-error', err);
      }
    });
});

ipcMain.on('node-start', ({ sender }) => {
  const config = loadJsonFile.sync(path.join(__dirname, 'config.json'));
  const authorizationToken = crypto.randomBytes(20).toString('hex');
  config.rpc.authorization_token = authorizationToken;

  const cwd = path.resolve(app.getPath('userData'));
  writeJsonFile.sync(path.join(cwd, 'config.json'), config);

  const cmd = path.join(cwd, 'rai_node');
  const child = spawn(cmd, ['--daemon', '--data_path', cwd], {
    cwd,
    windowsHide: true,
  });

  child.on('error', (err) => {
    log.error('Error starting node:', err);
    if (!sender.isDestroyed()) {
      sender.send('node-error', err);
    }
  });

  child.stdout.on('data', data => log.info('[node]', data.toString()));
  child.stderr.on('data', data => log.error('[node]', data.toString()));

  const { port, address: host } = config.rpc;
  const proxy = httpProxy.createProxyServer({
    target: { host, port },
    xfwd: true,
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
    },
  });

  proxy.on('error', (err) => {
    log.error('[proxy]', err);
  });

  const expressApp = express();
  expressApp.set('trust proxy', host);

  expressApp.all('/rpc', (req, res) => proxy.web(req, res, { ignorePath: true }));

  const reviver = (key, value) => {
    if (key === 'block' && typeof value === 'string') {
      return JSON.parse(value);
    }

    return value;
  };

  expressApp.post('/callback', bodyParser.json({ reviver }), (req, res) => {
    const { type } = req.body;
    if (type === 'open' || type === 'receive') {
      log.info('TODO', req.body);
    }

    return res.status(202).end();
  });

  // eslint-disable-next-line no-unused-vars
  expressApp.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    log.error(err);
    return res.status(502).end();
  });

  const pems = selfsigned.generate([{ name: 'commonName', value: 'nano.org' }]);
  const key = normalizeNewline(pems.private);
  const cert = normalizeNewline(pems.cert);
  const server = httpolyglot.createServer({ key, cert }, expressApp);
  const onCertificateError = (event, webContents, url, error, { data }, callback) => {
    const isTrusted = data === cert;
    if (isTrusted) {
      event.preventDefault();
    }

    return callback(isTrusted);
  };

  app.on('certificate-error', onCertificateError);

  server.once('close', () => {
    log.info('Server closing');
    app.removeListener('certificate-error', onCertificateError);
    child.kill();
  });

  child.once('exit', () => {
    log.info('Node exited');
    if (server.listening) {
      server.close();
    }
  });

  mainWindow.prependOnceListener('closed', () => {
    server.close();
  });

  Object.defineProperty(global, 'isNodeStarted', {
    get() {
      return server.listening && !child.killed;
    },
  });

  server.once('listening', () => {
    log.info('Server listening');
    if (!sender.isDestroyed()) {
      sender.send('node-ready');
    }
  });

  server.listen(17076);
});

const run = async () => {
  await appReady;

  const dataPath = path.resolve(app.getPath('userData'));
  const nodePath = path.join(dataPath, 'rai_node');
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

  const template = [
    {
      label: 'Application',
      submenu: [
        { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click() { app.quit(); } },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
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
unhandled({ logger: log.error });

debug({ showDevTools: true });

run();
