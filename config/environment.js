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
      eula: 'https://nanowalletcompany.com/desktop-eula',
      privacyPolicy: 'https://nanowalletcompany.com/desktop-privacy-policy',
    },

    assets: {
      data: {
        url: 'https://snapshots.nano.org/data.tar.xz',
        signature: 'https://snapshots.nano.org/data.tar.xz.sha256',
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
