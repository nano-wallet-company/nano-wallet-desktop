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
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/node-darwin-698798436c7a12b50360bf7a36b8b17a.zip',
          integrity: 'sha512-GJgZmjwe0L/Zd2ryDTo4MG63eJCsBFaQjEMun/42CaeLsPenSPnVcRWcND5GH5Vv9AZmhg/qZfRJJtNzJXVfaQ==',
        },
        linux: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/node-linux-14490c4f97d204d3edad4a370cb129fd.zip',
          integrity: 'sha512-IIrRm6AUOd7HefOwNy4YVpUKLjaFM0KTrmaTZwYgmow5kiKVvtV+Qhs/k4Dv4eZWdBvygT2AxTdHVRtOsA7Fug==',
        },
        win32: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/node-win32-9a82e5347de383929b97b2a8ef88aa0a.zip',
          integrity: 'sha512-rM48YIoRKvAmCouivBK9qqlQXSkpJWango0bs8esbVTulG/XvsXKWuGUDqFiyfPt24Mxo8kWxgwr0HIh80EXMw==',
        },
      },
      data: {
        darwin: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/data-f356607a83d34613c810cc68755114b8.zip',
          integrity: 'sha512-dSCSDvr2NwMy3FmIVqlI1Q9gVNCrU3/e5//kTWKI4J/0XVEK9m/lDfQmGHr5pvqTgVBMdPD/5/9T2jzvNSaoYQ==',
        },
        linux: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/data-f356607a83d34613c810cc68755114b8.zip',
          integrity: 'sha512-dSCSDvr2NwMy3FmIVqlI1Q9gVNCrU3/e5//kTWKI4J/0XVEK9m/lDfQmGHr5pvqTgVBMdPD/5/9T2jzvNSaoYQ==',
        },
        win32: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/data-f356607a83d34613c810cc68755114b8.zip',
          integrity: 'sha512-dSCSDvr2NwMy3FmIVqlI1Q9gVNCrU3/e5//kTWKI4J/0XVEK9m/lDfQmGHr5pvqTgVBMdPD/5/9T2jzvNSaoYQ==',
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
