const path = require('path');

const {
  version,
  productName,
  name: packageName,
  copyright: appCopyright,
  build: {
    appId: appBundleId,
    mac: {
      category: appCategoryType,
    },
    linux: {
      desktop: {
        Categories: linuxDesktopCategories,
      },
    },
  },
} = require('../package');

const icon = path.join(__dirname, 'resources', 'icon');

const [, name] = packageName.split('/');
const categories = linuxDesktopCategories.split(';');
const productIdentifier = productName.split(' ').join('');

const buildNumber = process.env.CI_JOB_ID
  || process.env.CI_BUILD_ID
  || process.env.TRAVIS_BUILD_NUMBER
  || process.env.APPVEYOR_BUILD_VERSION
  || '0';

const buildVersion = `${version}+${buildNumber}`;

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
    appCopyright,
    buildVersion,
    appBundleId,
    appCategoryType,
    arch: 'x64',
    asar: true,
    overwrite: true,
    ignore: ['\\.xml$'],
    packageManager: 'yarn',
    executableName: name,
    win32metadata: {
      InternalName: productIdentifier,
      OriginalFilename: `${name}.exe`,
    },
  },
  electronWinstallerConfig: {
    name,
    exe: `${name}.exe`,
    setupExe: `${productName} Setup.exe`,
    setupIcon: `${icon}.ico`,
    loadingGif: path.join(__dirname, 'resources', 'install-spinner.gif'),
  },
  electronInstallerDMG: {
    format: 'ULFO',
  },
  electronInstallerDebian: {
    name,
    categories,
    bin: name,
    arch: 'amd64',
    icon: {
      scalable: `${icon}.svg`,
    },
  },
  electronInstallerRedhat: {
    name,
    categories,
    bin: name,
    arch: 'x86_64',
    compressionLevel: 9,
    icon: `${icon}.png`,
  },
  github_repository: {
    owner: 'nanocurrency',
    name: 'nano-desktop',
  },
};
