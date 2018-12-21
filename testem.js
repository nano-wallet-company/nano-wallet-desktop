/* eslint-env node */
module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'Chrome',
  ],
  launch_in_dev: [
    'Chrome',
  ],
  browser_args: {
    Chrome: [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-software-rasterizer',
      '--mute-audio',
      '--remote-debugging-port=0',
      '--window-size=1440,900',

      // https://github.com/GoogleChrome/puppeteer/blob/v1.11.0/lib/Launcher.js#L36
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-client-side-phishing-detection',
      '--disable-default-apps',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--disable-features=site-per-process',
      '--disable-hang-monitor',
      '--disable-ipc-flooding-protection',
      '--disable-popup-blocking',
      '--disable-prompt-on-repost',
      '--disable-renderer-backgrounding',
      '--disable-sync',
      '--disable-translate',
      '--enable-automation',
      '--metrics-recording-only',
      '--no-first-run',
      '--password-store=basic',
      '--safebrowsing-disable-auto-update',
      '--use-mock-keychain',
    ],
  },
};
