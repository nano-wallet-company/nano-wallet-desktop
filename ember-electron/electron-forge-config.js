const path = require('path');

const semver = require('semver');

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

const buildNumber = process.env.CI_JOB_ID
  || process.env.CI_BUILD_ID
  || process.env.TRAVIS_BUILD_NUMBER
  || process.env.APPVEYOR_BUILD_VERSION
  || '0';

const buildVersion = `${version}+${buildNumber}`;

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
    appCopyright,
    buildVersion,
    appBundleId,
    appCategoryType,
    arch: 'x64',
    asar: true,
    overwrite: true,
    ignore: ['\\.xml$'],
    packageManager: 'yarn',
    executableName: productName,
    win32metadata: {
      ProductName: productIdentifier,
      InternalName: productIdentifier,
      OriginalFilename: `${productName}.exe`,
    },
  },
  electronWinstallerConfig: {
    name: productIdentifier,
    version: String(semver.coerce(version)),
    exe: `${productName}.exe`,
    noMsi: false,
    setupIcon: `${icon}.ico`,
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
