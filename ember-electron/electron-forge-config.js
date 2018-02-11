const path = require('path');

const { productName: packageDisplayName } = require('../package');

const icon = path.join(__dirname, 'icons', 'app');
const packageName = packageDisplayName.split(' ').join('');

module.exports = {
  make_targets: {
    win32: [
      'squirrel',
    ],
    darwin: [
      'dmg',
    ],
    linux: [
      'deb',
      'rpm',
    ],
  },
  electronPackagerConfig: {
    icon,
    asar: true,
  },
  electronWinstallerConfig: {},
  electronInstallerDMG: {},
  electronInstallerDebian: {},
  electronInstallerRedhat: {},
  github_repository: {
    owner: 'nanocurrency',
    name: 'nano-desktop',
  },
  windowsStoreConfig: {
    packageName,
    packageDisplayName,
  },
};
