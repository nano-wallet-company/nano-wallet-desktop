const path = require('path');

const semver = require('semver');

const { version, productName, name: packageName } = require('../package');

const icon = path.join(__dirname, 'resources', 'icon');

const [, name] = packageName.split('/');
const categories = ['P2P', 'Finance', 'Security'];

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
    name: productName,
    exe: `${productName}.exe`,
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
    categories,
    bin: name,
    arch: 'amd64',
  },
  electronInstallerRedhat: {
    name,
    categories,
    bin: name,
    arch: 'x86_64',
    compressionLevel: 9,
  },
  github_repository: {
    owner: 'nanocurrency',
    name: 'nano-desktop',
  },
};
