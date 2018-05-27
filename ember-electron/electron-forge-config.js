const path = require('path');

const semver = require('semver');

const { version, productName, name } = require('../package');

const icon = path.join(__dirname, 'icons', 'app');

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
    noMsi: false,
    exe: `${productIdentifier}.exe`,
    version: String(semver.coerce(version)),
    setupExe: `${productName} ${version} Setup.exe`,
    setupMsi: `${productName} ${version} Setup.msi`,
  },
  electronInstallerDMG: {
    format: 'ULFO',
  },
  electronInstallerDebian: {
    name,
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
