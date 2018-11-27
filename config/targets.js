/* eslint-env node */
const semver = require('semver');

const { devDependencies } = require('../package');

const browsers = [];
const isElectron = !!process.env.EMBER_CLI_ELECTRON;
if (isElectron) {
  const electronVersion = semver.clean(devDependencies['electron-prebuilt-compile']);
  browsers.push(`Electron >= ${electronVersion}`);
} else {
  browsers.push('last 2 Chrome versions');

  const isCI = !!process.env.CI;
  const isProduction = process.env.EMBER_ENV === 'production';
  if (isCI || isProduction) {
    browsers.push(
      'last 2 Safari versions',
      'last 2 Firefox versions',
      'last 2 Edge versions',
    );
  }
}

module.exports = {
  browsers,
};
