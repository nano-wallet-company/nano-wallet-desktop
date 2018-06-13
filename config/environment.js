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
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/node-darwin-81cfb574fd7af3b4dd362ed641a137a8.zip',
          integrity: 'sha512-4LOxmM1mQrjY47Ccy1FNR6B1c1HGWEufsyTnnruuHpzf0ccPpekUxz0vIwE5y+3670tD4H3so+6s15ZmXraUPA==',
        },
        linux: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/node-linux-c98d8bba809d40207a1b5508440b9977.zip',
          integrity: 'sha512-u3PQS3+RA0QjVm4XyosHELY/zrDJG7umXDyFfQH2HBE52L0diffoCfbBfaAIqrqgBgBlaJdRhkW+7J4IKj1yiQ==',
        },
        win32: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/node-win32-9535791526eceec3562221fb3158b3a7.zip',
          integrity: 'sha512-LlTC/iBW0s//K2w9/GaSQoyRE6jRu5PUZrX9SmeKWh6o/Us9zJw4wxDAO6uLM2wPV4lQ3K3NtQR2DNY58p33Qg==',
        },
      },
      data: {
        darwin: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/data-fa55b585ca9e0fd47821b8f2b1759d73.zip',
          integrity: 'sha512-34rMuX59X+T3zsB/8gKpvEn6XCvYngzsBg6hX3UvESOkcDUikr7wy70oYqU3wLqCVZbK5VOWiZTTz0XU+wnJiA==',
        },
        linux: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/data-fa55b585ca9e0fd47821b8f2b1759d73.zip',
          integrity: 'sha512-34rMuX59X+T3zsB/8gKpvEn6XCvYngzsBg6hX3UvESOkcDUikr7wy70oYqU3wLqCVZbK5VOWiZTTz0XU+wnJiA==',
        },
        win32: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/data-fa55b585ca9e0fd47821b8f2b1759d73.zip',
          integrity: 'sha512-34rMuX59X+T3zsB/8gKpvEn6XCvYngzsBg6hX3UvESOkcDUikr7wy70oYqU3wLqCVZbK5VOWiZTTz0XU+wnJiA==',
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
