/* eslint-env node */
const {
  version,
  description,
  name: modulePrefix,
  productName: title,
} = require('../package');

module.exports = (environment) => {
  const ENV = {
    title,
    version,
    description,
    modulePrefix,
    environment,
    rootURL: '',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
        'ember-improved-instrumentation': true,
      },
      EXTEND_PROTOTYPES: false,
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'default-src': ["'none'"],
      'script-src': ["'self'"],
      'font-src': ["'self'"],
      'connect-src': ["'self'", 'https://api.coinmarketcap.com'],
      'img-src': ["'self'", 'data:'],
      'style-src': ["'self'"],
      'media-src': ["'self'"],
    },

    contentSecurityPolicyMeta: true,

    'ember-service-worker': {
      enabled: environment === 'production',
    },

    assets: {
      node: {
        darwin: {
          url: 'https://s3-us-west-2.amazonaws.com/nano-apps/node-darwin-b14cc99b57f79c4d613090f66914dc9a.zip',
          integrity: 'sha512-zo1+rTcj8ynGjH/MAcW9Yow0Oa6epU4MLWuZqAOHWflcFEcOcX7ey7LRImCXoLCf/X13IhnD7n+aJZ63yzVBig==',
        },
        linux: {
          url: 'https://s3-us-west-2.amazonaws.com/nano-apps/node-linux-4e79b60fd4303ca47cb9cbb5f57f6b65.zip',
          integrity: 'sha512-g19HD8vjI1YN6BMJcI0RnvaAKwz23AKBNzxYeB4sEEAT3geni9U8iCY62u5IERC7Ju1PTxSbrkNFWBg/MQrOew==',
        },
        win32: {
          url: 'https://s3-us-west-2.amazonaws.com/nano-apps/node-win32-ac5fc2593111b7513a573ecdd4f9a4fc.zip',
          integrity: 'sha512-2aWD9eV9KQ+/xtc/hQhSN/B56PzR0bcTycxkLgo+zJ6WGn70jqM3tjsNDbh2c4NSKLPV8ZrJdUyEJLZ6leZ8bQ==',
        },
      },
      data: {
        darwin: {
          url: 'https://s3-us-west-2.amazonaws.com/nano-apps/data-cd87939e4f21ef9d797326dc7cbe0f28.zip',
          integrity: 'sha512-ei5rhb4DcVXrRZdQHHAjkqQxa/ednzA6JEImqKpRWTbe0CpqM0o7g5MssVY+InEfcV2EMd5la9VpEjB1HwCNhg==',
        },
        linux: {
          url: 'https://s3-us-west-2.amazonaws.com/nano-apps/data-cd87939e4f21ef9d797326dc7cbe0f28.zip',
          integrity: 'sha512-ei5rhb4DcVXrRZdQHHAjkqQxa/ednzA6JEImqKpRWTbe0CpqM0o7g5MssVY+InEfcV2EMd5la9VpEjB1HwCNhg==',
        },
        win32: {
          url: 'https://s3-us-west-2.amazonaws.com/nano-apps/data-cd87939e4f21ef9d797326dc7cbe0f28.zip',
          integrity: 'sha512-ei5rhb4DcVXrRZdQHHAjkqQxa/ednzA6JEImqKpRWTbe0CpqM0o7g5MssVY+InEfcV2EMd5la9VpEjB1HwCNhg==',
        },
      },
    },
  };

  ENV.contentSecurityPolicy['script-src'].push("'unsafe-inline'", "'unsafe-eval'");
  ENV.contentSecurityPolicy['style-src'].push("'unsafe-inline'");

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy['connect-src'].push('http://localhost:5555', 'http://localhost:55000');
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  if (process.env.EMBER_CLI_ELECTRON) {
    ENV.contentSecurityPolicy['connect-src'].push('https://localhost:17076');
  }

  return ENV;
};
