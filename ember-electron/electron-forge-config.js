const path = require('path');
const moment = require('moment');

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

const buildNumber = moment().format('YYYYMMDDHHmmss');
const buildVersion = `${version}+${buildNumber}`;

const osxSign = {
  identity: process.env.CSC_NAME || true,
  entitlements: false,
};

const certificateFile = process.env.CSC_LINK || undefined;
const certificatePassword = process.env.CSC_KEY_PASSWORD || undefined;

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
    ignore: [
      '\\.xml$',
      '\bordering.txt$',
    ],
    asar: {
      ordering: path.join(__dirname, 'ordering.txt'),
      unpackDir: path.join('ember-electron', 'resources'),
    },
    extendInfo: {
      CFBundleDevelopmentRegion: 'en_US',
      CSResourcesFileMapped: true,
    },
    overwrite: true,
    packageManager: 'yarn',
    executableName: name,
    win32metadata: {
      InternalName: productIdentifier,
      OriginalFilename: `${name}.exe`,
    },
  },
  electronWinstallerConfig: {
    name,
    certificateFile,
    certificatePassword,
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
