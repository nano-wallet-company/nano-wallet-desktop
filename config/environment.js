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

    'ember-service-worker': {
      enabled: environment === 'production',
    },

    flashMessageDefaults: {
      preventDuplicates: true,
    },

    assets: {
      node: {
        darwin: {
          url: 'https://devinus.ngrok.io/node.zip',
          integrity: 'sha512-U7nGfzr/L9zrDSDmx0C4jDyjYQeKc98JJAAlNLHQ8OodmSz6ojETrT0v6nZJYwo4IKsKf9FMn4B4vNZ3t2S4kw==',
        },
      },
      data: {
        darwin: {
          url: 'https://devinus.ngrok.io/data.zip',
          integrity: 'sha512-+KpaNlir22fU+y1hT/gZ1ViMDUKbXl+zMHe+l7HrTgH3ljwQnfZ50u4FaYnILyBKuqFHq1SmS0cT08MAGKVRzQ==',
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
