const path = require('path');

const semver = require('semver');

const { version, productName, name: packageName } = require('../package');

const icon = path.join(__dirname, 'icons', 'app');

const [, name] = packageName.split('/');
const productIdentifier = productName.split(' ').join('');

module.exports = {
  make_targets: {
    win32: [
      'zip',
      'squirrel',
    ],
    darwin: [
      'zip',
      'dmg',
    ],
    linux: [
      'zip',
      'deb',
      'rpm',
    ],
  },
  electronPackagerConfig: {
    icon,
    asar: true,
    ignore: ['\\.xml$'],
    packageManager: 'yarn',
  },
  electronWinstallerConfig: {
    name: productIdentifier,
    title: productIdentifier,
    exe: `${productIdentifier}.exe`,
    noMsi: false,
    version: String(semver.coerce(version)),
    setupExe: `${productName} ${version} Setup.exe`,
    setupMsi: `${productName} ${version} Setup.msi`,
  },
  electronInstallerDMG: {
    format: 'ULFO',
  },
  electronInstallerDebian: {
    name,
    bin: name,
    arch: 'amd64',
    genericName: 'Wallet',
    section: 'cryptocurrency',
    categories: ['P2P', 'Finance', 'Currency'],
  },
  electronInstallerRedhat: {
    name,
  },
  github_repository: {
    owner: 'nanocurrency',
    name: 'nano-desktop',
  },
  windowsStoreConfig: {
    packageName: productIdentifier,
    packageDisplayName: productName,
  },
};
