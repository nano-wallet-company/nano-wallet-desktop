/* eslint-env node */

// eslint-disable-next-line arrow-body-style
module.exports = (environment, appConfig) => {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  const { title, description, rootURL } = appConfig;

  return {
    name: title,
    description,
    short_name: title,
    start_url: rootURL || '.',
    display: 'standalone',
    background_color: '#e9ecef',
    theme_color: '#343a40',
    icons: [
      {
        src: `${rootURL}assets/icons/icon-32.png`,
        sizes: '32x32',
        targets: ['favicon'],
      },
      {
        src: `${rootURL}images/icons/icon-310.png`,
        element: 'square310x310logo',
        targets: ['ms'],
      },
      ...[192, 512].map(size => ({
        src: `${rootURL}assets/icons/icon-${size}.png`,
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
