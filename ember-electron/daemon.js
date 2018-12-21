const os = require('os');
const net = require('net');
const path = require('path');

const spdy = require('spdy');
const cors = require('cors');
const helmet = require('helmet');
const cpFile = require('cp-file');
const connect = require('connect');
const getPort = require('get-port');
const makeDir = require('make-dir');
const username = require('username');
const waitPort = require('wait-port');
const nanoid = require('nanoid/async');
const httpProxy = require('http-proxy');
const selfsigned = require('selfsigned');
const crossSpawn = require('cross-spawn');
const signalExit = require('signal-exit');
const expressJwt = require('express-jwt');
const loadJsonFile = require('load-json-file');
const serverDestroy = require('server-destroy');
const writeJsonFile = require('write-json-file');
const normalizeNewline = require('normalize-newline');
const toExecutableName = require('to-executable-name');

const Promise = require('bluebird');
const writeFileAtomic = Promise.promisify(require('write-file-atomic'));
const jsonwebtoken = Promise.promisifyAll(require('jsonwebtoken'));
const fs = Promise.promisifyAll(require('graceful-fs'), {
  filter(name) {
    return ['readFile'].includes(name);
  },
});

const electron = require('electron');
const log = require('electron-log');
const { is } = require('electron-util');

const { app } = electron;

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

const startDaemon = async () => {
  const dataPath = path.normalize(global.dataPath);
  const configPath = path.join(dataPath, 'config.json');
  const loopbackAddress = await getLoopbackAddress();
  let config = {};
  try {
    config = await loadJsonFile(configPath);
  } catch (err) {
    const env = global.environment;
    log.info(`Node configuration not found, generating for ${env}`);
    config = await loadJsonFile(path.join(__dirname, `config.${env}.json`));
    config.rpc.address = loopbackAddress;
  }

  const tlsPath = path.join(dataPath, 'tls');
  const dhParamPath = path.join(tlsPath, 'dh2048.pem');
  if (!config.rpc.secure) {
    log.info('Generating secure node RPC configuration...');
    const clientsPath = path.join(tlsPath, 'clients');
    await makeDir(clientsPath, { fs });

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
      verbose_logging: is.development,
      server_cert_path: serverCertPath,
      server_key_path: serverKeyPath,
      server_key_passphrase: '',
      server_dh_path: dhParamPath,
      client_certs_path: clientsPath,
    };
  }

  const host = config.rpc.address;
  const port = await getPort({ host, port: [config.rpc.port] });
  const peeringPort = await getPort({ host, port: [config.node.peering_port] });
  config.rpc.port = port;
  config.node.peering_port = peeringPort;
  config.node.logging.log_rpc = is.development;

  const cpuCount = os.cpus().length;
  config.node.io_threads = Math.max(2, Math.ceil(cpuCount / 2));
  config.node.network_threads = config.node.io_threads;
  config.node.work_threads = 2;
  config.node.bootstrap_connections = Math.max(4, config.node.network_threads);
  config.node.bootstrap_connections_max = Math.min(64, config.node.bootstrap_connections * 4);

  const { version: configVersion } = config;
  log.info(`Writing node configuration version ${configVersion}:`, configPath);
  await writeJsonFile(configPath, config, {
    mode: 0o600,
    replacer(key, value) {
      return typeof value === 'object' ? value : String(value);
    },
  });

  const cmd = path.join(global.resourcesPath, toExecutableName('rai_node'));
  log.info('Starting node:', cmd);

  const child = crossSpawn(cmd, ['--daemon', '--data_path', dataPath], {
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

  app.once('will-quit', killHandler);
  child.once('exit', () => app.removeListener('will-quit', killHandler));

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
  const jwtid = await nanoid(32);
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

module.exports = {
  startDaemon,
};
