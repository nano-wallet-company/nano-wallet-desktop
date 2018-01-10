/* eslint-env node */

const { description, productName: name } = require('../package');

// eslint-disable-next-line arrow-body-style
module.exports = (/* environment, appConfig */) => {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name,
    description,
    short_name: name,
    start_url: '/',
    display: 'standalone',
    background_color: '#e9ecef',
    theme_color: '#343a40',
    icons: [
      {
        src: '/assets/icons/icon-32.png',
        sizes: '32x32',
        targets: ['favicon'],
      },
      {
        src: '/images/icons/icon-310.png',
        element: 'square310x310logo',
        targets: ['ms'],
      },
      ...[192, 512].map(size => ({
        src: `/assets/icons/icon-${size}.png`,
        sizes: `${size}x${size}`,
      })),
    ],
    apple: {
      statusBarStyle: 'black',
    },
    ms: {
      tileColor: '#e9ecef',
    },
  };
};
