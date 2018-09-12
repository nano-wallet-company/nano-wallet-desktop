/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { extensions: defaultExtensions } = require('broccoli-asset-rev/lib/default-options');

module.exports = (defaults) => {
  const app = new EmberApp(defaults, {
    '@ember-decorators/babel-transforms': {
      disable: true,
    },

    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-syntax-async-generators'],
        ['@babel/plugin-proposal-function-bind'],
      ],
    },

    sourcemaps: {
      enabled: true,
      extensions: ['js'],
    },

    fingerprint: {
      extensions: defaultExtensions.concat([
        'svg',
        'webp',
        'eot',
        'otf',
        'ttf',
        'woff',
        'woff2',
        'xml',
        'webmanifest',
      ]),
    },

    'ember-cli-babel': {
      includePolyfill: true,
    },

    'ember-cli-uglify': {
      uglify: {
        compress: {
          keep_infinity: true,
          reduce_funcs: false,
          typeofs: false,
          unused: false,
        },
      },
    },

    'ember-service-worker': {
      enabled: EmberApp.env() === 'production' && !process.env.EMBER_CLI_ELECTRON,
      versionStrategy: 'every-build',
      registrationStrategy: 'async',
    },

    'ember-bootstrap': {
      bootstrapVersion: 4,
      importBootstrapFont: false,
      importBootstrapCSS: false,
    },

    'ember-cli-image-transformer': {
      images: [
        {
          inputFilename: 'public/images/brand-icon.svg',
          outputFileName: 'icon-',
          convertTo: 'png',
          sizes: [32, 192, 310, 512],
        },
      ],
    },

    nodeAssets: {
      'slick-carousel': {
        vendor: {
          srcDir: 'slick',
          destDir: 'slick-carousel',
          include: ['slick.js', 'slick.css', 'slick-theme.css'],
        },
        public: {
          srcDir: 'slick',
          destDir: 'assets',
          include: ['ajax-loader.gif', 'fonts/*'],
        },
      },
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('vendor/slick-carousel/slick.js');
  app.import('vendor/slick-carousel/slick.css');
  app.import('vendor/slick-carousel/slick-theme.css');

  return app.toTree();
};
