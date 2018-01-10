/* eslint-env node */

const { name: modulePrefix } = require('../package');

module.exports = (environment) => {
  const ENV = {
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
          url: 'https://devinus.ngrok.io/rai_node.zip',
          integrity: 'sha512-+X2PSYvP/hjF6inQdpRBSl30aMCJMwuLjhaEHkqEj4CWgKeGOsCokqnyWJHW06uomci2/w26s8phshWGXMg1pQ==',
        },
      },
      database: {
        darwin: {
          url: 'https://devinus.ngrok.io/data.zip',
          integrity: 'sha512-JEoy/dx6+nNGEYCt0BNHDzvZ/40qqD7CF94gv+75Y0B8+iQMDlGtc818aEyR/mZhGiJG+sFu2ra3+gWRfqyaAw==',
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
