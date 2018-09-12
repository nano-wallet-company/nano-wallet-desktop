const path = require('path');
const crypto = require('crypto');

const got = require('got');
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

const log = require('electron-log');
const { download } = require('electron-dl');

const { version, productName } = require('../package');

const USER_AGENT = `${productName.replace(/\s+/g, '')}/${version}`;
const SIGNATURE_HEADER = 'x-amz-meta-signature';

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
      'accept-encoding': 'gzip, deflate',
    },
  });

  if (!headers[SIGNATURE_HEADER]) {
    throw new Error('Signature header not found');
  }

  log.info('Verifying asset:', savePath);
  const verifier = crypto.createVerify('SHA256');
  const { size } = await fs.statAsync(savePath);
  const progress = createProgressStream(size, onProgress);
  await pump(fs.createReadStream(savePath), progress, verifier);

  const publicKey = await fs.readFileAsync(path.join(__dirname, 'assets.pem'));
  const signature = Buffer.from(String(headers[SIGNATURE_HEADER]).trim(), 'base64');
  return verifier.verify(publicKey, signature);
};

const extractAsset = async (savePath, extractDir, onProgress) => {
  log.info('Extracting asset:', savePath);

  const extract = tarStream.extract();
  const { size } = await fs.statAsync(savePath);
  return pump(
    fs.createReadStream(savePath),
    createProgressStream(size, onProgress),
    lzma.createDecompressor({ flags: lzma.CONCATENATED }),
    tar.extract(extractDir, {
      fs,
      extract,
      fmode: 0o600,
      dmode: 0o700,
    }),
  );
};

const downloadAsset = async (sender, url, onStarted, onProgress) => {
  log.info('Downloading asset:', url);

  const dl = await download(sender, url, {
    onStarted,
    onProgress,
    showBadge: false,
  });

  if (!sender.isDestroyed()) {
    sender.send('download-verify');
  }

  const savePath = dl.getSavePath();
  const verified = await verifyAsset(url, savePath, onProgress);
  if (!verified) {
    throw new Error('Verification failed');
  }

  if (!sender.isDestroyed()) {
    sender.send('download-extract');
  }

  const assetName = path.basename(savePath, '.tar.xz');
  const extractDir = path.join(path.dirname(savePath), productName, assetName);
  await makeDir(extractDir);
  await extractAsset(savePath, extractDir, onProgress);
  await del(savePath, { force: true });

  const dataPath = path.normalize(global.dataPath);
  await cpy('*', dataPath, { cwd: extractDir });
  await del(extractDir, { force: true });

  log.info('Asset ready:', savePath, '->', dataPath);
};

module.exports = {
  downloadAsset,
};
