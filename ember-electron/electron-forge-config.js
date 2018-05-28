const path = require('path');

const semver = require('semver');

const {
  version,
  productName,
  name: packageName,
  copyright: appCopyright,
} = require('../package');

const icon = path.join(__dirname, 'resources', 'icon');

const [, name] = packageName.split('/');
const categories = ['P2P', 'Finance', 'Security'];

const appVersion = String(semver.coerce(version));
const buildNumber = process.env.CI_BUILD_ID
  || process.env.TRAVIS_BUILD_NUMBER
  || process.env.APPVEYOR_BUILD_VERSION
  || '';

const buildVersion = `${appVersion}.${buildNumber}`;

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
    appVersion,
    appCopyright,
    buildVersion,
    asar: true,
    overwrite: true,
    ignore: ['\\.xml$'],
    packageManager: 'yarn',
    executableName: productName,
    appBundleId: 'org.nano.desktop',
    appCategoryType: 'public.app-category.finance',
    win32metadata: {
      ProductName: productIdentifier,
      InternalName: productIdentifier,
      OriginalFilename: `${productName}.exe`,
    },
  },
  electronWinstallerConfig: {
    name: productIdentifier,
    exe: `${productName}.exe`,
    noMsi: false,
    version: appVersion,
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
