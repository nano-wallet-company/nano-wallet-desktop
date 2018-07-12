/* eslint-env node */
/* eslint-disable no-console */
const env = process.env.NODE_ENV || process.env.EMBER_ENV || 'production';
if (typeof process.env.ELECTRON_IS_DEV === 'undefined') {
  if (env === 'development') {
    process.env.ELECTRON_IS_DEV = 1;
  }
}

const electron = require('electron');
const log = require('electron-log');
const unhandled = require('electron-unhandled');
const { is, appReady } = require('electron-util');

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
if (is.windows) {
  // eslint-disable-next-line global-require
  if (require('electron-squirrel-startup')) {
    return;
  }
}

const os = require('os');
const net = require('net');
const path = require('path');

const spdy = require('spdy');
const ssri = require('ssri');
const cors = require('cors');
const helmet = require('helmet');
const connect = require('connect');
const getPort = require('get-port');
const waitPort = require('wait-port');
const httpProxy = require('http-proxy');
const selfsigned = require('selfsigned');
const expressJwt = require('express-jwt');
const serverDestroy = require('server-destroy');

const nanoid = require('nanoid');
const semver = require('semver');
const locale2 = require('locale2');
const username = require('username');
const debounceFn = require('debounce-fn');
const progressStream = require('progress-stream');
const normalizeNewline = require('normalize-newline');
const toExecutableName = require('to-executable-name');

const cpy = require('cpy');
const del = require('del');
const cpFile = require('cp-file');
const makeDir = require('make-dir');
const spawn = require('cross-spawn');
const signalExit = require('signal-exit');
const pathExists = require('path-exists');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');

const Promise = require('bluebird');
const extractZip = Promise.promisify(require('extract-zip'));
const writeFileAtomic = Promise.promisify(require('write-file-atomic'));
const jsonwebtoken = Promise.promisifyAll(require('jsonwebtoken'));
const fs = Promise.promisifyAll(require('graceful-fs'), {
  filter(name) {
    return ['stat', 'readFile'].includes(name);
  },
});

const debug = require('electron-debug');
const Store = require('electron-store');
const windowState = require('electron-window-state');
const contextMenu = require('electron-context-menu');
const protocolServe = require('electron-protocol-serve');
const { download } = require('electron-dl');
const { default: installExtension, EMBER_INSPECTOR } = require('electron-devtools-installer');

const {
  version,
  productName,
  homepage,
  author: { email },
} = require('../package');

const {
  app,
  shell,
  ipcMain,
  protocol,
  Menu,
  BrowserWindow,
} = electron;

let mainWindow = null;

const shouldQuit = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

if (shouldQuit) {
  app.quit();
  return;
}

log.transports.file.level = 'info';
log.transports.rendererConsole.level = 'info';

global.locale = locale2 || null;
global.isDataDownloaded = false;
global.isNodeStarted = false;
global.isQuitting = false;
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

const basePath = is.development ? __dirname : path.join(process.resourcesPath, 'app.asar.unpacked', 'ember-electron');
const resourcesPath = path.join(basePath, 'resources');

const generateCert = (commonName) => {
  const attrs = [
    { name: 'commonName', value: commonName },
    { name: 'countryName', value: 'US' },
    { name: 'stateOrProvinceName', value: 'Texas' },
    { name: 'localityName', value: 'Austin' },
    { name: 'organizationName', value: 'Nano Wallet Company LLC' },
    { name: 'organizationalUnitName', value: 'Desktop' },
    { name: 'emailAddress', value: 'desktop@nanowalletcompany.com' },
  ];

  log.info('Generating TLS certificate:', commonName);
  return selfsigned.generate(attrs, {
    keySize: 2048,
    algorithm: 'sha256',
    extensions: [],
  });
};

const downloadAsset = async (sender, url, integrity, onProgress) => {
  log.info('Downloading asset:', url);

  const dl = await download(sender, url, { onProgress });
  const savePath = dl.getSavePath();
  const { size } = await fs.statAsync(savePath);
  const progress = progressStream({ length: size, time: 250 });
  progress.on('progress', ({ percentage = 0 }) => onProgress(percentage / 100));

  const readStream = fs.createReadStream(savePath).pipe(progress);
  log.info('Verifying asset:', savePath, integrity);
  if (!sender.isDestroyed()) {
    sender.send('download-verify');
  }

  await ssri.checkStream(readStream, integrity);

  const name = path.basename(savePath, path.extname(savePath));
  const extractDir = path.join(path.dirname(savePath), name);
  log.info('Extracting asset:', savePath, '->', extractDir);
  if (!sender.isDestroyed()) {
    sender.send('download-extract');
  }

  await extractZip(savePath, { dir: extractDir, defaultFileMode: 0o600 });
  await del(savePath, { force: true });

  const dataPath = path.normalize(app.getPath('userData'));
  log.info('Moving asset:', extractDir, '->', dataPath);
  await cpy('*', dataPath, { cwd: extractDir });
  await del(extractDir, { force: true });

  log.info('Downloaded asset ready:', name);
};

ipcMain.on('download-start', ({ sender }, url, integrity) => {
  const onProgress = debounceFn((progress = 0) => {
    if (!sender.isDestroyed()) {
      sender.send('download-progress', progress);
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

const getLoopbackAddress = () => new Promise((resolve, reject) => {
  const server = net.createServer();
  server.unref();
  return server.listen(function Server(err) {
    if (err) {
      return reject(err);
    }

    const { address } = this.address();
    return server.close(() => {
      const loopback = net.isIPv6(address) ? '::1' : '127.0.0.1';
      return resolve(loopback);
    });
  });
});

const forceKill = (child, timeout = 5000) => {
  if (!child.killed) {
    child.kill();
  }

  if (child.stdin) {
    child.stdin.destroy();
  }

  if (child.stdout) {
    child.stdout.destroy();
  }

  if (child.stderr) {
    child.stderr.destroy();
  }

  const { pid } = child;
  child.unref();

  const interval = 500;
  function poll() {
    try {
      process.kill(pid, 0);
      setTimeout(() => {
        try {
          process.kill(pid, 'SIGKILL');
          log.warn('Forcefully killed process PID:', pid);
        } catch (e) {
          setTimeout(poll, interval);
        }
      }, timeout);
    } catch (e) {
      // ignore
    }
  }

  return setTimeout(poll, interval);
};

const startNode = async () => {
  const dataPath = path.normalize(app.getPath('userData'));
  const configPath = path.join(dataPath, 'config.json');
  const loopbackAddress = await getLoopbackAddress();
  let config = {};
  try {
    config = await loadJsonFile(configPath);
  } catch (err) {
    log.info(`Node configuration not found, generating for ${env}`);
    config = await loadJsonFile(path.join(__dirname, `config.${env}.json`));
    config.rpc.address = loopbackAddress;
  }

  const tlsPath = path.join(dataPath, 'tls');
  const dhParamPath = path.join(tlsPath, 'dh2048.pem');
  if (!config.rpc.secure) {
    log.info('Generating secure node RPC configuration...');
    const clientsPath = path.join(tlsPath, 'clients');
    await makeDir(clientsPath);

    const serverCertPath = path.join(tlsPath, 'server.cert.pem');
    const serverKeyPath = path.join(tlsPath, 'server.key.pem');
    const serverPems = generateCert('nanowalletcompany.com');
    await writeFileAtomic(serverCertPath, normalizeNewline(serverPems.cert), { mode: 0o600 });
    await writeFileAtomic(serverKeyPath, normalizeNewline(serverPems.private), { mode: 0o600 });
    await cpFile(path.join(__dirname, 'tls', 'dh2048.pem'), dhParamPath);

    const clientCertPath = path.join(clientsPath, 'rpcuser1.cert.pem');
    const clientKeyPath = path.join(clientsPath, 'rpcuser1.key.pem');
    const clientPems = generateCert('desktop.nanowalletcompany.com');
    await writeFileAtomic(clientCertPath, normalizeNewline(clientPems.cert), { mode: 0o600 });
    await writeFileAtomic(clientKeyPath, normalizeNewline(clientPems.private), { mode: 0o600 });

    const subjectHash = '3634213b'; // openssl x509 -noout -subject_hash -in rpcuser1.cert.pem
    const subjectHashPath = path.join(clientsPath, `${subjectHash}.0`);
    await cpFile(clientCertPath, subjectHashPath);

    // https://github.com/cryptocode/notes/wiki/RPC-TLS
    config.rpc.secure = {
      enable: true,
      verbose_logging: true,
      server_cert_path: serverCertPath,
      server_key_path: serverKeyPath,
      server_key_passphrase: '',
      server_dh_path: dhParamPath,
      client_certs_path: clientsPath,
    };
  }

  const host = config.rpc.address;
  const port = await getPort({ host, port: config.rpc.port });
  const peeringPort = await getPort({ host, port: config.node.peering_port });
  config.rpc.port = port;
  config.node.peering_port = peeringPort;

  const cpuCount = os.cpus().length;
  config.node.io_threads = cpuCount;
  config.node.work_threads = cpuCount;

  const { version: configVersion } = config;
  log.info(`Writing node configuration version ${configVersion}:`, configPath);
  await writeJsonFile(configPath, config, {
    mode: 0o600,
    replacer(key, value) {
      return typeof value === 'object' ? value : String(value);
    },
  });

  const cmd = path.join(resourcesPath, toExecutableName('rai_node'));
  log.info('Starting node:', cmd);

  const child = spawn(cmd, ['--daemon', '--data_path', dataPath], {
    cwd: dataPath,
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const { pid } = child;
  if (!pid) {
    const err = new Error('Node not started');
    err.code = 'ENOENT';
    err.path = cmd;
    throw err;
  }

  try {
    process.kill(pid, 0);
  } catch (e) {
    const err = new Error('Node not running');
    err.code = e.code;
    err.pid = pid;
    throw err;
  }

  log.info(`Node started (PID ${pid}, RPC port ${port}, peering port ${peeringPort})`);

  child.stdout.on('data', data => log.info('[node]', String(data).trim()));
  child.stderr.on('data', data => log.error('[node]', String(data).trim()));

  const killHandler = () => child.kill();
  const removeExitHandler = signalExit(killHandler);
  child.once('exit', () => {
    removeExitHandler();
    global.isNodeStarted = false;
    log.info(`Node exiting (PID ${pid})`);
    forceKill(child);
  });

  app.once('before-quit', killHandler);
  child.once('exit', () => app.removeListener('before-quit', killHandler));

  const { client_certs_path: clientCertsPath } = config.rpc.secure;
  const cert = await fs.readFileAsync(path.join(clientCertsPath, 'rpcuser1.cert.pem'));
  const key = await fs.readFileAsync(path.join(clientCertsPath, 'rpcuser1.key.pem'));
  const dhparam = await fs.readFileAsync(dhParamPath);
  const proxy = httpProxy.createProxyServer({
    target: {
      host,
      port,
      cert,
      key,
      protocol: 'https:',
    },
    ssl: {
      dhparam,
      secureProtocol: 'TLSv1_2_client_method',
    },
    secure: false,
    changeOrigin: true,
  });

  proxy.on('error', err => log.error('[proxy]', err));

  const pems = generateCert('rpc.nanowalletcompany.com');
  const proxyCert = normalizeNewline(pems.cert);
  const proxyKey = normalizeNewline(pems.private);

  const issuer = 'https://rpc.nanowalletcompany.com/';
  const audience = 'https://desktop.nanowalletcompany.com/';
  const subject = await username();
  const jwtid = nanoid(32);
  const jwtOptions = {
    issuer,
    audience,
    subject,
    jwtid,
  };

  const jwtMiddleware = expressJwt(Object.assign({}, jwtOptions, {
    secret: proxyCert,
    algorithms: ['RS256'],
  }));

  const connectApp = connect();
  connectApp.use(helmet());
  connectApp.use(helmet.noCache());
  connectApp.use(cors({ origin: true, methods: ['POST'] }));
  connectApp.use(jwtMiddleware);

  connectApp.use((req, res, next) => {
    res.removeHeader('Authorization');
    return next();
  });

  connectApp.use((req, res, next) => proxy.web(req, res, { ignorePath: true }, next));

  connectApp.use((err, req, res, next) => {
    log.error('[proxy]', err);
    return next();
  });

  const serverOptions = {
    dhparam,
    cert: proxyCert,
    key: proxyKey,
    secureProtocol: 'TLSv1_2_server_method',
  };

  const server = spdy.createServer(serverOptions, connectApp);
  serverDestroy(server);

  const onCertificateError = (event, webContents, url, error, { data }, callback) => {
    const isTrusted = data === proxyCert;
    if (isTrusted) {
      event.preventDefault();
    }

    return callback(isTrusted);
  };

  app.on('certificate-error', onCertificateError);

  server.once('close', () => {
    log.info('Proxy server closing');
    app.removeListener('certificate-error', onCertificateError);
    global.authorizationToken = null;
  });

  server.once('close', killHandler);
  child.once('exit', () => {
    server.removeListener('close', killHandler);
    server.destroy((() => server.unref()));
  });

  Object.defineProperty(global, 'isNodeStarted', {
    get() {
      return server.listening && !child.killed;
    },
  });

  log.info(`Waiting for node to be ready on ${host}:${port}...`);
  await waitPort({ host, port, output: 'silent' });

  const tokenPayload = Object.create(null);
  const signOptions = Object.assign({}, jwtOptions, { algorithm: 'RS256' });
  log.info(`Generating JWT token for ${subject}...`);
  global.authorizationToken = await jsonwebtoken.signAsync(tokenPayload, proxyKey, signOptions);

  const proxyPort = 17076;
  return new Promise((resolve, reject) => {
    log.info(`Proxy server starting on ${loopbackAddress}:${proxyPort}`);
    server.listen(proxyPort, loopbackAddress, function Server(err) {
      if (err) {
        return reject(err);
      }

      const { family, address, port: listenPort } = this.address();
      const listenHost = family === 'IPv6' ? `[${address}]` : address;
      log.info(`Proxy server ready at https://${listenHost}:${listenPort}`);
      return resolve(server);
    });
  });
};

ipcMain.on('node-start', ({ sender }) => {
  startNode()
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
});

const createWindow = () => {
  const {
    workAreaSize: {
      width: maxWidth,
      height: maxHeight,
    },
  } = electron.screen.getPrimaryDisplay();

  const mainWindowState = windowState({
    defaultWidth: Math.min(maxWidth, 1280),
    defaultHeight: Math.min(maxHeight, 768),
  });

  const {
    x,
    y,
    width,
    height,
  } = mainWindowState;

  const icon = path.join(resourcesPath, 'icon.png');
  const win = new BrowserWindow({
    icon,
    x,
    y,
    width,
    height,
    minWidth: 320,
    minHeight: 720,
    show: false,
    center: true,
    darkTheme: true,
    transparent: true,
    scrollBounce: true,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#000034',
    title: productName,
    tabbingIdentifier: productName,
    webPreferences: {
      webviewTag: false,
    },
  });

  win.setAutoHideMenuBar(true);
  win.setMenuBarVisibility(false);
  mainWindowState.manage(win);

  const template = [
    { role: 'editMenu' },
    {
      label: 'View',
      submenu: [
        { role: 'toggleFullScreen' },
        { type: 'separator' },
        { role: 'toggleDevTools' },
      ],
    },
    { role: 'windowMenu' },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            return shell.openExternal(homepage);
          },
        },
        {
          label: 'Report Issue',
          click() {
            const subject = `${productName} Issue Report`;
            const body = `Version: ${version}\r\nPlatform: ${process.platform}`;
            const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            return shell.openExternal(url);
          },
        },
        {
          label: 'View Logs',
          click() {
            const { file } = log.transports.file;
            return shell.showItemInFolder(file);
          },
        },
      ],
    },
  ];

  if (is.macos) {
    template.unshift({
      label: productName,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // win.once('ready-to-show', () => win.show());

  win.on('close', (event) => {
    if (is.macos && !global.isQuitting) {
      event.preventDefault();
      win.hide();
    }
  });

  win.on('unresponsive', () => {
    log.warn('Application window has become unresponsive:', win.getTitle());
  });

  win.on('responsive', () => {
    log.info('Application window has become responsive again:', win.getTitle());
  });

  const emberAppLocation = 'serve://dist';

  // Load the ember application using our custom protocol/scheme
  win.loadURL(emberAppLocation);

  win.webContents.once('dom-ready', () => {
    log.info('Application window ready to show:', win.getTitle());
    win.show();
  });

  // If a loading operation goes wrong, we'll send Electron back to
  // Ember App entry point
  win.webContents.on('did-fail-load', () => {
    if (!win.isDestroyed()) {
      win.loadURL(emberAppLocation);
    }
  });

  win.webContents.on('crashed', () => {
    log.error('Application in window has crashed:', win.getTitle());
  });

  return win;
};

const run = async () => {
  log.info('Starting application');

  await appReady;

  const store = new Store({ name: 'settings' });
  const dataPath = path.normalize(app.getPath('userData'));
  const storeVersion = store.get('version');
  if (!storeVersion || semver.gt(version, storeVersion)) {
    const outdatedAssets = ['config.json'];
    log.info('Deleting outdated assets:', outdatedAssets.join(', '));
    await del(outdatedAssets, { force: true, cwd: dataPath });
  }

  store.set('version', version);

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

  mainWindow = createWindow();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
};

debug({ showDevTools: true });
contextMenu();

module.exports = run();
