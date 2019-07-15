/* eslint-env node */
const semver = require('semver');

const { devDependencies } = require('../package');

const browsers = [];
const isElectron = !!process.env.EMBER_CLI_ELECTRON;
if (isElectron) {
  const { version } = semver.minVersion(devDependencies['electron-prebuilt-compile']);
  browsers.push(`Electron >= ${version}`);
} else {
  browsers.push('last 1 Chrome versions');

  const isCI = !!process.env.CI;
  const isProduction = process.env.EMBER_ENV === 'production';
  if (isCI || isProduction) {
    browsers.push('last 1 Safari versions', 'last 1 Firefox versions', 'last 1 Edge versions');
  }
}

module.exports = {
  browsers,
};
