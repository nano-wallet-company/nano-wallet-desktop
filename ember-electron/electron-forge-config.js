const path = require('path');

const del = require('del');
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

const icon = path.join(__dirname, 'resources', 'icon');

const [, name] = packageName.split('/');
const categories = linuxDesktopCategories.split(';');

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
    icon,
    osxSign,
    appCopyright,
    buildVersion,
    appBundleId,
    appCategoryType,
    ignore: [
      '\\.xml$',
      '\\.node$',
      '/\\.DS_Store$',
      '/ember-electron/resources/ordering.txt$',
    ],
    asar: {
      // https://github.com/electron/asar/blob/v0.14.3/lib/asar.js#L80
      ordering: path.join(__dirname, 'resources', 'ordering.txt'),
      unpackDir: '{ember-electron/resources,node_modules/**/binding-*}',
    },
    // extendInfo: {
    //   CSResourcesFileMapped: true,
    // },
    overwrite: true,
    packageManager: 'yarn',
    executableName: name,
    win32metadata: {
      FileDescription: productName,
      InternalName: name,
      OriginalFilename: `${name}.exe`,
      ProductName: productName,
    },
    afterPrune: [
      (buildPath, electronVersion, platform, arch, callback) => {
        const cwd = path.join(buildPath, 'node_modules', 'lzma-native');
        return del(['{deps,build}', 'bin/**'], { cwd })
          .then(() => callback(), err => callback(err));
      },
    ],
  },
  electronWinstallerConfig: {
    name,
    certificateFile,
    certificatePassword,
    exe: `${name}.exe`,
    setupIcon: `${icon}.ico`,
    loadingGif: path.join(__dirname, 'resources', 'install-spinner.gif'),
  },
  electronInstallerDMG: {
  },
  electronInstallerDebian: {
    name,
    categories,
    bin: name,
    arch: debianArch(process.arch),
    icon: {
      scalable: `${icon}.svg`,
      '512x512': `${icon}.png`,
    },
  },
  electronInstallerRedhat: {
    name,
    categories,
    bin: name,
    arch: redhatArch(process.arch),
    compressionLevel: 9,
    icon: `${icon}.png`,
  },
  github_repository: {
    owner: 'nano-wallet-company',
    name: 'nano-wallet-desktop',
  },
};
