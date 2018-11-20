const path = require('path');
const crypto = require('crypto');

const got = require('got');
const { request } = require('http2-wrapper');

const pumpify = require('pumpify');
const through2 = require('through2');
const duplexify = require('duplexify');

const lzma = require('lzma-native');
const tarFs = require('tar-fs');
const tarStream = require('tar-stream');
const progressStream = require('progress-stream');

const cpy = require('cpy');
const del = require('del');
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

const { app } = electron;

const { version, productName } = require('../package');

const USER_AGENT = `${productName.replace(/\s+/g, '')}/${version}`;
const SIGNATURE_HEADER = 'x-amz-meta-signature';

const client = got.extend({
  request,
  retry: 10,
  encoding: null,
  headers: Object.create({
    'user-agent': USER_AGENT,
  }),
});

const createProgressStream = (length, onProgress) => {
  const progress = progressStream({ length, time: 250 });
  progress.on('progress', ({ percentage = 0 }) => onProgress(percentage / 100));
  return progress;
};

const verifyAsset = async (url, signature, verifier) => {
  log.info('Verifying asset:', url);

  const publicKey = await fs.readFileAsync(path.join(__dirname, 'assets.pem'));
  return verifier.verify(publicKey, signature, 'base64');
};

const extractAsset = async (url, length, extractDir, onProgress) => {
  log.info('Extracting asset:', url, '->', extractDir);

  const verifier = crypto.createVerify('SHA256');
  const extract = tarStream.extract();
  await pump(
    client.get(url, { stream: true }),
    pumpify(
      duplexify(
        verifier,
        through2(),
      ),
      createProgressStream(length, onProgress),
      lzma.createDecompressor({ flags: lzma.CONCATENATED }),
      tarFs.extract(extractDir, {
        fs,
        extract,
        fmode: 0o600,
        dmode: 0o700,
      }),
    ),
  );

  return verifier;
};

const moveAssets = async (extractDir) => {
  const dataPath = path.normalize(global.dataPath);
  log.info('Moving asset files:', path.join(extractDir, '*'), '->', dataPath);

  const files = await cpy('*', dataPath, { cwd: extractDir });
  await del(extractDir, { force: true });
  return files;
};

const downloadAsset = async (url, onProgress) => {
  log.info('Downloading asset metadata:', url);

  const { headers } = await client.head(url);
  if (!headers[SIGNATURE_HEADER]) {
    throw new Error('Signature header not found');
  }

  const extractDir = path.join(app.getPath('downloads'), productName);
  await makeDir(extractDir);

  log.info('Downloading asset:', url, '->', extractDir);

  const length = parseInt(headers['content-length'] || 0, 10);
  const verifier = await extractAsset(url, length, extractDir, onProgress);
  const signature = String(headers[SIGNATURE_HEADER]).trim();
  const verified = await verifyAsset(url, signature, verifier);
  if (!verified) {
    throw new Error('Verification failed');
  }

  const files = await moveAssets(extractDir);
  log.info('Assets ready:', files.join(', '));
};

module.exports = {
  downloadAsset,
};
