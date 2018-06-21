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
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/node-darwin-b9ff8ecb9e24dc04abafa1f66316a6d6.zip',
          integrity: 'sha512-iq0cprgQW34Z1XM/tjHMedgO2YL06V5e9B7TVtMpTi7hexWg04+Y/s0qXlKzBs+iCFW1md9B6xNSFnu5vYQURg==',
        },
        linux: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/node-linux-35a24703de264fa835c5ceb93c87a821.zip',
          integrity: 'sha512-lVtL5v67VcfbyoKAYdPWz4GR9rhDoRaUDM+xfYuPKcER160iU+KnOtlOF1a3lSZ4wXYtwzcYZIpKsR0u3yIGzA==',
        },
        win32: {
          url: 'https://d31vj5w9sn4ozg.cloudfront.net/node-win32-5ae0fdc584ae22242cc73d605d467d0b.zip',
          integrity: 'sha512-C4UIfeZ/roSIAWGtIIMmZ4wqVrV/Gqj3qyr9S6L90LbD6a52FHDdTg9dFCCIC1opeeX8yuh70ckOhJjdG9lU5g==',
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
