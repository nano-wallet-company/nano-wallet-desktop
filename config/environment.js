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
      'script-src': ["'self'", "'unsafe-eval'"],
      'font-src': ["'self'"],
      'connect-src': ["'self'", 'https://api.coinmarketcap.com'],
      'img-src': ["'self'", 'data:'],
      'style-src': ["'self'", "'unsafe-inline'"],
      'media-src': ["'self'"],
      'manifest-src': ["'self'"],
    },

    contentSecurityPolicyMeta: true,

    viewportConfig: {
      viewportSpy: true,
    },

    links: {
      eula: 'http://nanowalletcompany.com/desktop-eula',
      privacyPolicy: 'http://nanowalletcompany.com/desktop-privacy-policy',
    },

    assets: {
      node: {
        darwin: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/node-darwin-279f85555acaed0389b7e57e3cb297c0.zip',
          integrity: 'sha512-zHNdCliE54LS3pi+9kVMdPBcwrRn2+ZEKUQIUp4IdYxayPdK4PwPlrw77/C5n7Pktd4MznYSZwgENinqu8TwUg==',
        },
        linux: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/node-linux-f5b74a20953302efb20d69ca4286002e.zip',
          integrity: 'sha512-PUxwhZCoxwgyiSDsyLTVtf8CN8o7eq52RQVGWkQYMP1UhVnxzB3av3b9fDWIQUMt4MX+m9NseZ0ih5tMTOdwmg==',
        },
        win32: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/node-win32-81fab5d322f815e380bbd05f5ea357f7.zip',
          integrity: 'sha512-jPs+LYnMsYeetWHFchfjKm4aHD/djMoe4uBbVFtm3fDkflFSrIy7oOag+2SVpa8EAI9j/eDPLh3W7Ad5zJYyZw==',
        },
      },
      data: {
        darwin: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/data-625bfca3b2dab79aff91d8a7f413025b.zip',
          integrity: 'sha512-G8JIbeWoqIAyXu436KW6GxmT8LND8ixIwTxp+Q+WYxtDwd9VJ/GhE0eCkE9SEIqc570x7S+nu8drOKZGblfAYw==',
        },
        linux: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/data-625bfca3b2dab79aff91d8a7f413025b.zip',
          integrity: 'sha512-G8JIbeWoqIAyXu436KW6GxmT8LND8ixIwTxp+Q+WYxtDwd9VJ/GhE0eCkE9SEIqc570x7S+nu8drOKZGblfAYw==',
        },
        win32: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/data-625bfca3b2dab79aff91d8a7f413025b.zip',
          integrity: 'sha512-G8JIbeWoqIAyXu436KW6GxmT8LND8ixIwTxp+Q+WYxtDwd9VJ/GhE0eCkE9SEIqc570x7S+nu8drOKZGblfAYw==',
        },
      },
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy['connect-src'].push('http://localhost:55000');
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

    ENV.contentSecurityPolicy['script-src'].push("'sha256-37u63EBe1EibDZ3vZNr6mxLepqlY1CQw+4N89HrzP9s='");
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  if (process.env.EMBER_CLI_ELECTRON) {
    ENV.contentSecurityPolicy['script-src'].push("'sha256-bOpoN0CEbM1axa1+hv51a4JK31vrAOV7Cbze5rS9GJI='");
    ENV.contentSecurityPolicy['script-src'].push("'sha256-k8ysrhm1lqKyZpON3/YocPOUXAF4sGsu7JIycGDxCWw='");
    ENV.contentSecurityPolicy['connect-src'].push('https://localhost:17076');
  }

  return ENV;
};
