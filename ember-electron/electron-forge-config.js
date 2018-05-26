const path = require('path');

const semver = require('semver');

const { version, productName, name: packageName } = require('../package');

const [name] = packageName.split('/').slice(-1);
const icon = path.join(__dirname, 'icons', 'app');

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
    name,
    noMsi: false,
    exe: `${productName}.exe`,
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
    packageName: productName.split(' ').join(''),
    packageDisplayName: productName,
  },
};
