/* eslint-env node */
/* eslint-disable no-console */
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');

const electron = require('electron');
const fs = require('graceful-fs');
const spawn = require('cross-spawn');
const ssri = require('ssri');
const spdy = require('spdy');
const cors = require('cors');
const helmet = require('helmet');
const connect = require('connect');
const locale2 = require('locale2');
const username = require('username');
const cpFile = require('cp-file');
const makeDir = require('make-dir');
const getPort = require('get-port');
const waitPort = require('wait-port');
const signalExit = require('signal-exit');
const httpProxy = require('http-proxy');
const selfsigned = require('selfsigned');
const expressJwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const debounceFn = require('debounce-fn');
const extractZip = require('extract-zip');
const pathExists = require('path-exists');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const writeFileAtomic = require('write-file-atomic');
const normalizeNewline = require('normalize-newline');
const toExecutableName = require('to-executable-name');

const {
  app,
  ipcMain,
  protocol,
  BrowserWindow,
} = electron;

const env = process.env.NODE_ENV || process.env.EMBER_ENV || 'production';

if (typeof process.env.ELECTRON_IS_DEV === 'undefined') {
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

const { productName } = require('../package.json');

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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

global.locale = locale2 || null;
global.isNodeDownloaded = false;
global.isDataDownloaded = false;
global.isNodeStarted = false;
global.authorizationToken = null;

const extract = promisify(extractZip);

const generateCert = (commonName) => {
  const attrs = [
    { name: 'commonName', value: commonName },
    { name: 'countryName', value: 'US' },
    { name: 'stateOrProvinceName', value: 'DE' },
    { name: 'localityName', value: 'Wilmington' },
    { name: 'organizationName', value: 'Nano Wallet Company, LLC' },
    { name: 'organizationalUnitName', value: 'Desktop' },
    { name: 'emailAddress', value: 'desktop@nano.org' },
  ];

  return selfsigned.generate(attrs, {
    keySize: 2048,
    algorithm: 'sha256',
    extensions: [],
  });
};

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
  await extract(savePath, { dir, defaultFileMode: 0o600 });

  log.info('Asset download done:', url);
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

ipcMain.on('node-start', ({ sender }) => {
  const dataPath = path.resolve(app.getPath('userData'));
  const cmd = path.join(dataPath, toExecutableName('rai_node'));
  const child = spawn(cmd, ['--daemon', '--data_path', dataPath], {
    cwd: dataPath,
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const removeExitHandler = signalExit(() => child.kill());
  child.once('exit', () => {
    global.isNodeStarted = false;
    removeExitHandler();
    log.error('[node]', 'Node exited');
    if (!sender.isDestroyed()) {
      sender.send('node-exit');
    }
  });

  child.on('error', (err) => {
    log.error('[node]', 'Error starting:', err);
    if (!sender.isDestroyed()) {
      sender.send('node-error', err);
    }
  });

  child.stdout.on('data', data => log.info('[node]', String(data).trim()));
  child.stderr.on('data', data => log.error('[node]', String(data).trim()));

  const { rpc } = loadJsonFile.sync(path.join(dataPath, 'config.json'));
  const host = rpc.address;
  const port = parseInt(rpc.port, 10);

  const { secure } = rpc;
  const { client_certs_path: clientCertsPath } = secure;
  const cert = fs.readFileSync(path.join(clientCertsPath, 'rpcuser1.cert.pem'));
  const key = fs.readFileSync(path.join(clientCertsPath, 'rpcuser1.key.pem'));
  const proxy = httpProxy.createProxyServer({
    target: {
      host,
      port,
      cert,
      key,
      protocol: 'https:',
    },
    secure: false,
    changeOrigin: true,
  });

  proxy.on('error', err => log.error('[proxy]', err));

  const pems = generateCert('rpc.nano.org');
  const proxyCert = normalizeNewline(pems.cert);
  const proxyKey = normalizeNewline(pems.private);

  const issuer = 'https://rpc.nano.org/';
  const audience = 'https://desktop.nano.org/';
  const subject = username.sync();
  const jwtid = crypto.randomBytes(32).toString('hex');
  const tokenPayload = {};
  global.authorizationToken = jsonwebtoken.sign(tokenPayload, proxyKey, {
    issuer,
    audience,
    subject,
    jwtid,
    algorithm: 'RS256',
  });

  const connectApp = connect();
  connectApp.use(helmet());
  connectApp.use(helmet.noCache());
  connectApp.use(cors({ origin: true, methods: ['POST'] }));
  connectApp.use(expressJwt({
    issuer,
    audience,
    subject,
    jwtid,
    secret: proxyCert,
    algorithms: ['RS256'],
  }));

  connectApp.use((req, res, next) => {
    res.removeHeader('Authorization');
    return next();
  });

  connectApp.use((req, res, next) => proxy.web(req, res, { ignorePath: true }, next));

  // eslint-disable-next-line no-unused-vars
  connectApp.use((err, req, res, next) => log.error('[proxy]', err));

  const serverOptions = { cert: proxyCert, key: proxyKey };
  const server = spdy.createServer(serverOptions, connectApp);
  const onCertificateError = (event, webContents, url, error, { data }, callback) => {
    const isTrusted = data === proxyCert;
    if (isTrusted) {
      event.preventDefault();
    }

    return callback(isTrusted);
  };

  app.on('certificate-error', onCertificateError);

  server.once('close', () => {
    log.info('[proxy]', 'Server closing');
    app.removeListener('certificate-error', onCertificateError);
    global.authorizationToken = null;
    child.kill();
  });

  child.once('close', () => server.close());
  mainWindow.once('closed', () => server.close());

  Object.defineProperty(global, 'isNodeStarted', {
    get() {
      return server.listening && !child.killed;
    },
  });

  waitPort({ host, port, output: 'silent' })
    .then(() => {
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
    })
    .catch((err) => {
      child.emit('error', err);
    });
});

ipcMain.on('relaunch', () => {
  log.info('Relaunching app');
  app.relaunch();
  app.exit();
});

const run = async () => {
  const dataPath = path.resolve(app.getPath('userData'));
  const configPath = path.join(dataPath, 'config.json');
  let config = {};
  try {
    config = await loadJsonFile(configPath);
  } catch (err) {
    config = await loadJsonFile(path.join(__dirname, `config.${env}.json`));
  }

  const tlsPath = path.join(dataPath, 'tls');
  const clientsPath = path.join(tlsPath, 'clients');
  const clientKeyPath = path.join(clientsPath, 'rpcuser1.key.pem');
  if (!config.rpc.secure) {
    await makeDir(clientsPath);
    const writeFile = promisify(writeFileAtomic);
    const serverCertPath = path.join(tlsPath, 'server.cert.pem');
    const serverKeyPath = path.join(tlsPath, 'server.key.pem');
    const server = generateCert('nano.org');
    await writeFile(serverCertPath, normalizeNewline(server.cert), { mode: 0o600 });
    await writeFile(serverKeyPath, normalizeNewline(server.private), { mode: 0o600 });

    const dhParamPath = path.join(tlsPath, 'dh2048.pem');
    await cpFile(path.join(__dirname, 'tls', 'dh2048.pem'), dhParamPath);

    const clientCertPath = path.join(clientsPath, 'rpcuser1.cert.pem');
    const client = generateCert('desktop.nano.org');
    await writeFile(clientCertPath, normalizeNewline(client.cert), { mode: 0o600 });
    await writeFile(clientKeyPath, normalizeNewline(client.private), { mode: 0o600 });

    const subjectHash = 'e6606929'; // openssl x509 -noout -subject_hash -in rpcuser1.cert.pem
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
  config.rpc.port = await getPort({ host, port: config.rpc.port });
  config.node.peering_port = await getPort({ host, port: config.node.peering_port });

  const cpuCount = os.cpus().length;
  config.node.io_threads = cpuCount;
  config.node.work_threads = cpuCount;

  log.info('Writing node configuration:', configPath);
  await writeJsonFile(configPath, config, {
    mode: 0o600,
    replacer(key, value) {
      return typeof value === 'object' ? value : String(value);
    },
  });

  Object.defineProperty(global, 'locale', {
    get() {
      return app.getLocale() || locale2 || null;
    },
  });

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

  await appReady;

  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: Math.min(width, 1366),
    height: Math.min(height, 768),
    minWidth: Math.min(width, 240),
    minHeight: Math.min(width, 320),
    // frame: false,
    center: true,
    darkTheme: true,
    transparent: true,
    scrollBounce: true,
    // experimentalFeatures: true,
    // experimentalCanvasFeatures: true,
    // vibrancy: 'dark',
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#000034',
    title: productName,
    tabbingIdentifier: productName,
    webPreferences: {
      webviewTag: false,
    },
  });

  mainWindow.setMenu(null);

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
