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

const certificateFile = process.env.CSC_LINK || null;
const certificatePassword = process.env.CSC_KEY_PASSWORD || null;
const signWithParams = certificateFile && certificatePassword
  ? `/a /ph /tr http://timestamp.digicert.com /td sha256 /fd sha256 /f "${path.resolve(certificateFile)}" /p "${certificatePassword}"`
  : undefined;

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
      // https://github.com/electron/asar/blob/v0.14.3/lib/asar.js#L80
      ordering: path.join(__dirname, 'ordering.txt').replace('/', path.sep),
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
    signWithParams,
    exe: `${name}.exe`,
    setupExe: `${productName} ${version} Setup.exe`,
    setupIcon: `${icon}.ico`,
    loadingGif: path.join(__dirname, 'resources', 'install-spinner.gif'),
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
