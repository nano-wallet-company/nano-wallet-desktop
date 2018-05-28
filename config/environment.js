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

    assets: {
      node: {
        darwin: {
          url: 'https://s3-us-west-1.amazonaws.com/nano-wallet-desktop/node-darwin-aa7f39f6b0076b0608b07415912f1c3e.zip',
          integrity: 'sha512-dwnPh8B9SNQlyjKnggbTmc7Pu9HXvlnv99hoQpAwrNAsTX27XNqUYfl3BplpV9OFJ0djt9rlMxr9IcfrfKmkww==',
        },
        linux: {
          url: 'https://s3-us-west-1.amazonaws.com/nano-wallet-desktop/node-linux-d88c89ce31509177bfafeaf98832f4de.zip',
          integrity: 'sha512-XeUD0VML6NHf3idfgWOcuG7jxJPXzfJrm2fFXgiEUkrjFGwtLj1MMO2GB1sGjLK0P/v98ao1LHdRhkddqqddYA==',
        },
        win32: {
          url: 'https://s3-us-west-1.amazonaws.com/nano-wallet-desktop/node-win32-35d221ee802e6428fba1aa144e82d1f5.zip',
          integrity: 'sha512-o0Scn1GkPypJrTeGO9zOkcWRV0C/xnYp+vstjB+KKEGZ2LgYho1vqczz3ksQRkfMoIuoHghDJEXVl/3MBYfojw==',
        },
      },
      data: {
        darwin: {
          url: 'https://s3-us-west-1.amazonaws.com/nano-wallet-desktop/data-155d26936b168be32f5de4cf18365566.zip',
          integrity: 'sha512-zti8gejqpeZuo81pNYFpjEMdqdlQexlfQPEwePebRtYqlicQox8+cCSJvPcsvqtHeoDKQaWcFz1L1z4l6V/P3w==',
        },
        linux: {
          url: 'https://s3-us-west-1.amazonaws.com/nano-wallet-desktop/data-155d26936b168be32f5de4cf18365566.zip',
          integrity: 'sha512-zti8gejqpeZuo81pNYFpjEMdqdlQexlfQPEwePebRtYqlicQox8+cCSJvPcsvqtHeoDKQaWcFz1L1z4l6V/P3w==',
        },
        win32: {
          url: 'https://s3-us-west-1.amazonaws.com/nano-wallet-desktop/data-155d26936b168be32f5de4cf18365566.zip',
          integrity: 'sha512-zti8gejqpeZuo81pNYFpjEMdqdlQexlfQPEwePebRtYqlicQox8+cCSJvPcsvqtHeoDKQaWcFz1L1z4l6V/P3w==',
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
