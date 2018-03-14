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
        win32: {
          url: 'https://s3-us-west-2.amazonaws.com/nano-apps/node-win32-d674353de23b4513908cf46d90cb89a7.zip',
          integrity: 'sha512-XsUQBv2ziUdJgJyTeNzN4P54gasoS8T3x5fIMWeZkgpksndiM64XXrgoKPZAZEEwXHOrUlD3xc3rxMwanuohvg==',
        },
        darwin: {
          url: 'https://s3-us-west-2.amazonaws.com/nano-apps/node-darwin-67f9568651d44b2273c2d70130a30e4a.zip',
          integrity: 'sha512-8H57O2I93uTD0LzDD62O8WJYsfz6IJIs9JDceIAhaxDJvzADiw4D0W+Ex1agHAU4JpI9fn4eglF3624SYyDGqQ==',
        },
        linux: {
          url: 'https://s3-us-west-2.amazonaws.com/nano-apps/node-linux-13b4401e4f04533e84a4cfc13ad0de18.zip',
          integrity: 'sha512-M07tRr5K+OSWsv4c1eDFSgnxXpdo95usQ6iuguxykdydD2xQBfeTbCs9u/dRaZU7KEWg29hPmvGCnk1BHCj1Eg==',
        },
      },
      data: {
        win32: {
          url: 'https://s3-us-west-2.amazonaws.com/nano-apps/data-e3dcf0d33122491b14ee6c12850693c0.zip',
          integrity: 'sha512-yUoyEqm2KypwlhBzec2W5doshgjouZTniedkxguJiRzvD4+WKgvMs2/QBrKMf97YX+tPKhX60r+ROygCrZ+xGA==',
        },
        darwin: {
          url: 'https://s3-us-west-2.amazonaws.com/nano-apps/data-e3dcf0d33122491b14ee6c12850693c0.zip',
          integrity: 'sha512-yUoyEqm2KypwlhBzec2W5doshgjouZTniedkxguJiRzvD4+WKgvMs2/QBrKMf97YX+tPKhX60r+ROygCrZ+xGA==',
        },
        linux: {
          url: 'https://s3-us-west-2.amazonaws.com/nano-apps/data-e3dcf0d33122491b14ee6c12850693c0.zip',
          integrity: 'sha512-yUoyEqm2KypwlhBzec2W5doshgjouZTniedkxguJiRzvD4+WKgvMs2/QBrKMf97YX+tPKhX60r+ROygCrZ+xGA==',
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
