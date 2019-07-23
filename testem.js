/* eslint-env node */
const jobs = process.env.JOBS || -1;
const parallel = process.env.EMBER_EXAM_SPLIT_COUNT || jobs;

module.exports = {
  parallel,
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: ['Chrome'],
  launch_in_dev: ['Chrome'],
  browser_args: {
    Chrome: [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--mute-audio',
      '--remote-debugging-port=0',
      '--window-size=1440,900',

      // https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/lib/Launcher.js#L38
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-client-side-phishing-detection',
      '--disable-component-extensions-with-background-pages',
      '--disable-default-apps',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--disable-features=site-per-process,TranslateUI,BlinkGenPropertyTrees',
      '--disable-hang-monitor',
      '--disable-ipc-flooding-protection',
      '--disable-popup-blocking',
      '--disable-prompt-on-repost',
      '--disable-renderer-backgrounding',
      '--disable-sync',
      '--enable-automation',
      '--enable-features=NetworkService,NetworkServiceInProcess',
      '--force-color-profile=srgb',
      '--metrics-recording-only',
      '--no-first-run',
      '--password-store=basic',
      '--use-mock-keychain',
    ],
  },
};
