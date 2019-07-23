const path = require('path');

const del = require('del');

const {
  version,
  homepage,
  productName,
  name: packageName,
  copyright: appCopyright,
  build: {
    appId: appBundleId,
    mac: { category: appCategoryType },
    linux: {
      desktop: { Categories: linuxDesktopCategories },
    },
  },
} = require('../package');

const icon = path.join(__dirname, 'resources', 'icon');

const [, name] = packageName.split('/');
const categories = linuxDesktopCategories.split(';');

const buildNumber = new Date()
  .toISOString()
  .split('.')[0]
  .replace(/[^\d]/g, '');
const buildVersion = `${version}+${buildNumber}`;

const osxSign = {
  identity: process.env.CSC_NAME || true,
  entitlements: false,
};

const certificateFile = process.env.CSC_FILE ? path.resolve(process.env.CSC_FILE) : null;
const certificatePassword = process.env.CSC_KEY_PASSWORD || null;
const signWithParams =
  certificateFile && certificatePassword
    ? `/a /f "${certificateFile}" /p "${certificatePassword}" /fd sha256 /tr http://timestamp.digicert.com /td sha256`
    : undefined;

const unsupportedArch = (target, type) => {
  throw new Error(`Unsupported architecture for ${target}: ${type}`);
};

const debianArch = type => {
  const supported = new Map([['x64', 'amd64'], ['x32', 'i386']]);

  return supported.get(type) || unsupportedArch('deb', type);
};

const redhatArch = type => {
  const supported = new Map([['x64', 'x86_64'], ['x32', 'x86']]);

  return supported.get(type) || unsupportedArch('rpm', type);
};

module.exports = {
  make_targets: {
    win32: ['zip', 'squirrel'],
    darwin: ['zip', 'dmg'],
    linux: ['zip', 'deb', 'rpm'],
  },

  electronPackagerConfig: {
    icon,
    osxSign,
    appCopyright,
    buildVersion,
    appBundleId,
    appCategoryType,

    ignore: ['\\.xml$', '\\.node$', '/\\.DS_Store$', '/ember-electron/resources/ordering.txt$'],

    asar: {
      ordering: path.join(__dirname, 'resources', 'ordering.txt'),
      unpackDir: '{ember-electron/resources,node_modules/7zip,node_modules/**/binding-*}',
    },

    // extendInfo: {
    //   CSResourcesFileMapped: true,
    // },

    overwrite: true,
    packageManager: 'yarn',
    executableName: name,
    derefSymlinks: true,
    darwinDarkModeSupport: true,

    win32metadata: {
      FileDescription: productName,
      InternalName: name,
      OriginalFilename: `${name}.exe`,
      ProductName: productName,
    },

    afterPrune: [
      async (buildPath, electronVersion, platform, arch, callback) => {
        const cwd = path.join(buildPath, 'node_modules');
        const patterns = [
          '**/{bin,man}',
          'nan/tools',
          'nan/*.{tgz,h}',
          'lzma-native/{build,deps,src}',
          'lzma-native/*.{gyp,sh,xz}',
        ];

        try {
          await del(patterns, { cwd });
        } catch (err) {
          return callback(err);
        }

        return callback();
      },
    ],
  },

  electronWinstallerConfig: {
    name,
    signWithParams,
    exe: `${name}.exe`,
    iconUrl: `${homepage}/icon.ico`,
    setupIcon: `${icon}.ico`,
    loadingGif: path.join(__dirname, 'resources', 'install-spinner.gif'),
  },

  electronInstallerDMG: {
    icon: `${icon}.icns`,
    format: 'ULFO',
    additionalDMGOptions: {
      'code-sign': {
        'signing-identity': process.env.CSC_NAME || undefined,
      },
    },
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
