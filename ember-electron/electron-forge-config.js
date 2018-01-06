const path = require('path');

const icon = path.join(__dirname, 'icons', 'app');

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
    packageManager: 'npm',
  },
  electronWinstallerConfig: {
    name: 'Cairn',
  },
  electronInstallerDebian: {},
  electronInstallerRedhat: {},
  github_repository: {
    owner: '',
    name: '',
  },
  windowsStoreConfig: {
    packageName: '',
    name: 'Cairn',
  },
};
