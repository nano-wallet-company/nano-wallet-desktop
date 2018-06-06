/* eslint-env node */

module.exports = (/* environment */) => ({
  /*
    If present, the host configuration will be pulled based on the given
    string.

    ex) `APP_HOST=myapp.com ember s`
    */
  // hostOverride: process.env.APP_HOST,

  /*
    If the host doesn't resolve to any of the defined configs here,
    this will be the config used
    */
  default: {
    rpcHost: 'http://localhost:55000',
    rpcNamespace: null,
  },

  /*
    This is the host config that will be used in the test environment
    */
  test: {
    rpcHost: '',
    rpcNamespace: 'rpc',
  },

  // Electron
  dist: {
    rpcHost: 'https://localhost:17076',
    rpcNamespace: 'rpc',
  },
});
