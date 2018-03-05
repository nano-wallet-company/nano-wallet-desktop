const path = require('path');

const { productName, name: packageName } = require('../package');

const name = packageName.split('/').slice(-1);
const icon = path.join(__dirname, 'icons', 'app');

module.exports = {
  make_targets: {
    win32: [
      'zip',
    ],
    darwin: [
      'zip',
      'dmg',
    ],
    linux: [
      'zip',
      'deb',
    ],
  },
  electronPackagerConfig: {
    icon,
    asar: true,
    packageManager: 'yarn',
  },
  electronWinstallerConfig: {
    name,
    exe: `${productName}.exe`,
  },
  electronInstallerDMG: {},
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
