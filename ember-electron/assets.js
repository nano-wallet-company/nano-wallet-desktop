const path = require('path');
const crypto = require('crypto');

const got = require('got');
const prettyMs = require('pretty-ms');

const lzma = require('lzma-native');
const tar = require('tar-fs');
const tarStream = require('tar-stream');
const progressStream = require('progress-stream');

const del = require('del');
const cpy = require('cpy');
const makeDir = require('make-dir');

const Promise = require('bluebird');
const pump = Promise.promisify(require('pump'));
const fs = Promise.promisifyAll(require('graceful-fs'), {
  filter(name) {
    return ['stat', 'readFile'].includes(name);
  },
});

const electron = require('electron');
const log = require('electron-log');
const { download } = require('electron-dl');

const { version, productName } = require('../package');

const { app } = electron;

const USER_AGENT = `${productName.replace(/\s+/g, '')}/${version}`;
const SIGNATURE_HEADER = Symbol.for('x-amz-meta-signature');

const createProgressStream = (length, onProgress) => {
  const progress = progressStream({ length, time: 250 });
  progress.on('progress', ({ percentage = 0 }) => onProgress(percentage / 100));
  return progress;
};

const verifyAsset = async (url, savePath, onProgress) => {
  log.info('Downloading asset signature:', url);

  const { headers } = await got.head(url, {
    retries: 10,
    encoding: null,
    headers: {
      'user-agent': USER_AGENT,
    },
  });

  if (!headers[Symbol.keyFor(SIGNATURE_HEADER)]) {
    throw new Error('Signature header not found');
  }

  log.info('Verifying asset:', savePath);

  const start = Date.now();
  const verifier = crypto.createVerify('SHA256');
  const { size } = await fs.statAsync(savePath);
  const progress = createProgressStream(size, onProgress);

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await pump(fs.createReadStream(savePath), progress, verifier);

  const publicKey = await fs.readFileAsync(path.join(__dirname, 'assets.pem'));
  const signature = Buffer.from(String(headers[Symbol.keyFor(SIGNATURE_HEADER)]).trim(), 'base64');
  const verified = verifier.verify(publicKey, signature);
  const elapsed = Date.now() - start;
  log.info('Asset verified:', savePath, `(took ${prettyMs(elapsed)})`);
  return verified;
};

const extractAsset = async (savePath, extractDir, onProgress) => {
  log.info('Extracting asset:', savePath);

  const start = Date.now();
  const extract = tarStream.extract();
  const { size } = await fs.statAsync(savePath);
  const result = await pump(
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.createReadStream(savePath),
    createProgressStream(size, onProgress),
    lzma.createDecompressor(),
    tar.extract(extractDir, {
      fs,
      extract,
      fmode: 0o600,
      dmode: 0o700,
    }),
  );

  const elapsed = Date.now() - start;
  log.info('Asset extracted:', savePath, `(took ${prettyMs(elapsed)})`);
  return result;
};

const downloadAsset = async (sender, url, onStarted, onProgress) => {
  log.info('Downloading asset:', url);

  const directory = path.join(app.getPath('downloads'), productName);
  await del(directory, { force: true });
  await makeDir(directory, { fs });

  const { webContents: { session } } = sender;
  session.setUserAgent(USER_AGENT);

  const dl = await download(sender, url, {
    directory,
    onStarted,
    onProgress,
    showBadge: false,
  });

  const savePath = dl.getSavePath();
  const elapsed = Date.now() - dl.getStartTime();
  log.info('Asset downloaded:', savePath, `(took ${prettyMs(elapsed)})`);
  if (!sender.isDestroyed()) {
    sender.send('download-verify');
  }

  const verified = await verifyAsset(url, savePath, onProgress);
  if (!verified) {
    throw new Error('Verification failed');
  }

  if (!sender.isDestroyed()) {
    sender.send('download-extract');
  }

  const basename = path.basename(savePath, path.extname(savePath));
  const { name } = path.parse(basename);
  const extractDir = path.join(directory, name);
  await makeDir(extractDir, { fs });
  await extractAsset(savePath, extractDir, onProgress);
  await del(savePath, { force: true });

  const dataPath = path.normalize(global.dataPath);
  await cpy('*', dataPath, { cwd: extractDir });
  await del(directory, { force: true });

  log.info('Asset ready:', savePath, '->', dataPath);
};

module.exports = {
  downloadAsset,
};
