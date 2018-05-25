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
          url: 'https://s3-us-west-1.amazonaws.com/nano-wallet-desktop/node-darwin-1f6026a20ef5b8acbdf36e0d794e9985.zip',
          integrity: 'sha512-Ijsqk+L/LN7te/AZrbbMdhRTDwg/PE3MlN9edNGF7zftmA9ErdayyPuFvQITB1zXIgBcNaIv9Hq8YzLVrfcWQQ==',
        },
        linux: {
          url: 'https://s3-us-west-1.amazonaws.com/nano-wallet-desktop/node-linux-da82a3e34d263b48ebef22f5fd7ebf48.zip',
          integrity: 'sha512-j8V4RDmxfiEjoo5vqdFHwPr8pmLNtdfWJrupz6tODZFMhQ2SSQjgRDowJAp4jIx5XK/U1a7bWksqEChqfiUzKA==',
        },
        win32: {
          url: 'https://s3-us-west-1.amazonaws.com/nano-wallet-desktop/node-win32-d21a3efb23b3a4f6e0e90bbd8c307bd4.zip',
          integrity: 'sha512-ggbwO/C5mbC3m4f5SdBnU4d+N8QjCr1B1u4Vni96SbDJ+DWMRoBeLO4+y8ElHx0WnZ8W8t7LRQdMuexwdADKHg==',
        },
      },
      data: {
        darwin: {
          url: 'https://s3-us-west-1.amazonaws.com/nano-wallet-desktop/data-44628c1ba7fedb6032358f057d839a43.zip',
          integrity: 'sha512-+JaLWUTv1tMS0/Uey5Q76A5K86L63mw23i7jBOacLFzcWCA7XWhQsNwPAW/VYWYhQZliGQdkQGOhIObU+frtWw==',
        },
        linux: {
          url: 'https://s3-us-west-1.amazonaws.com/nano-wallet-desktop/data-44628c1ba7fedb6032358f057d839a43.zip',
          integrity: 'sha512-+JaLWUTv1tMS0/Uey5Q76A5K86L63mw23i7jBOacLFzcWCA7XWhQsNwPAW/VYWYhQZliGQdkQGOhIObU+frtWw==',
        },
        win32: {
          url: 'https://s3-us-west-1.amazonaws.com/nano-wallet-desktop/data-44628c1ba7fedb6032358f057d839a43.zip',
          integrity: 'sha512-+JaLWUTv1tMS0/Uey5Q76A5K86L63mw23i7jBOacLFzcWCA7XWhQsNwPAW/VYWYhQZliGQdkQGOhIObU+frtWw==',
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

    if (environment === 'development') {
      ENV.assets = {
        node: {
          darwin: {
            url: 'https://devinus.ngrok.io/node-darwin-22b488fde2c435bfb67093c8d27539b7.zip',
            integrity: 'sha512-HZ1M6HNTuWjvo6m4pZfPqEAm1Qu6ClctOjxUzhDE1enGtXetQ6TartjW4JQGRRTcWfFP204GErsuYKVI4X1ABA==',
          },
        },
        data: {
          darwin: {
            url: 'https://devinus.ngrok.io/data-2141e1d269e843a7b7ebdd8f177c1011.zip',
            integrity: 'sha512-nG9s2WsjgEuZzwiRxdCoOQljjJP1vi4Wuja+k3N/Z/1EEFCDSAdZWm63/tggrmdPJ89j6SuEspffKdrYiDDCEQ==',
          },
        },
      };
    }
  }

  return ENV;
};
