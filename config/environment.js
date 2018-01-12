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
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    flashMessageDefaults: {
      preventDuplicates: true,
    },

    assets: {
      node: {
        darwin: {
          url: 'https://devinus.ngrok.io/node.zip',
          integrity: 'sha512-U43/C5x+dGKBU0AtPXuKq7lE1XMMyNccaDhnqM6+YnBH9us+W7z9Q2rpN1ba0DEu4BufM0aEOQrtno+jo14Ueg==',
        },
      },
      data: {
        darwin: {
          url: 'https://devinus.ngrok.io/data.zip',
          integrity: 'sha512-KFFgyBboRaFjGM8bulJAeuYay0saBfgtf6i/WX3OXaO4T4vlJX0n0MjG1TApTpgSn32zNMTIdt3yMf8qBAFqJA==',
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

  return ENV;
};
