/* eslint-env node */
const Electron = require('ember-electron/lib/test-support/test-runner');

module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launchers: {
    Electron,
  },
  launch_in_ci: [
    'Electron',
  ],
  launch_in_dev: [
    'Electron',
  ],
};
