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

const { arch } = process;

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

const osxSign = { entitlements: true };
if (process.env.CSC_NAME) {
  osxSign.identity = process.env.CSC_NAME;
}

const unsupportedArch = (target, type) => {
  throw new Error(`Unsupported architecture for ${target}: ${type}`);
};

const debianArch = (type) => {
  const supported = {
    x64: 'amd64',
    x32: 'i386',
  };

  return supported[type] || unsupportedArch('deb', type);
};

const redhatArch = (type) => {
  const supported = {
    x64: 'x86_64',
    x32: 'x86',
  };

  return supported[type] || unsupportedArch('rpm', type);
};

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
    arch,
    icon,
    osxSign,
    appCopyright,
    buildVersion,
    appBundleId,
    appCategoryType,
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
    setupExe: `${productName} ${version} Setup.exe`,
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
    arch: debianArch(arch),
    icon: {
      scalable: `${icon}.svg`,
    },
  },
  electronInstallerRedhat: {
    name,
    categories,
    bin: name,
    arch: redhatArch(arch),
    compressionLevel: 9,
    icon: `${icon}.png`,
  },
  github_repository: {
    owner: 'nano-wallet-company',
    name: 'nano-wallet-desktop',
  },
};
