/* eslint-env node */
/* eslint-disable no-console */
const { dirname, join, resolve } = require('path');
const { spawn } = require('child_process');

const {
  app,
  Menu,
  BrowserWindow,
  protocol,
} = require('electron');
const protocolServe = require('electron-protocol-serve');
const log = require('electron-log');
const { appReady } = require('electron-util');

const fs = require('mz/fs');
const download = require('download');

let mainWindow = null;

// Registering a protocol & schema to serve our Ember application
protocol.registerStandardSchemes(['serve'], { secure: true });
protocolServe({
  cwd: join(__dirname || resolve(dirname('')), '..', 'ember'),
  app,
  protocol,
});

// Uncomment the lines below to enable Electron's crash reporter
// For more information, see http://electron.atom.io/docs/api/crash-reporter/
// electron.crashReporter.start({
//     productName: 'YourName',
//     companyName: 'YourCompany',
//     submitURL: 'https://your-domain.com/url-to-submit',
//     autoSubmit: true
// });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const run = async () => {
  await appReady;

  const binPath = join(app.getPath('userData'), 'bin');
  const cmd = join(binPath, 'rai_node');
  const exists = await fs.exists(cmd);
  if (!exists) {
    await fs.mkdir(binPath);
    await download('https://devinus.ngrok.io/rai_node.zip', binPath, { extract: true });
  }

  const subprocess = spawn(cmd, ['--daemon']);
  subprocess.on('error', e => log.error(e));
  subprocess.stdout.on('data', data => log.info('[rai_node]', data.toString()));
  subprocess.stderr.on('data', data => log.error('[rai_node]', data.toString()));

  const template = [
    {
      label: 'Application',
      submenu: [
        { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click() { app.quit(); } },
      ],
    }, {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
  });

  if (process.env.ELECTRON_ENV === 'development') {
    // eslint-disable-next-line global-require
    const { default: installExtension, EMBER_INSPECTOR } = require('electron-devtools-installer');
    installExtension(EMBER_INSPECTOR)
      .then(() => mainWindow.openDevTools())
      .catch(err => log.error(err));
  }

  const emberAppLocation = 'serve://dist';

  // Load the ember application using our custom protocol/scheme
  mainWindow.loadURL(emberAppLocation);

  // If a loading operation goes wrong, we'll send Electron back to
  // Ember App entry point
  mainWindow.webContents.on('did-fail-load', () => {
    mainWindow.loadURL(emberAppLocation);
  });

  mainWindow.webContents.on('crashed', () => {
    log.error('Your Ember app (or other code) in the main window has crashed.');
    log.error('This is a serious issue that needs to be handled and/or debugged.');
  });

  mainWindow.on('unresponsive', () => {
    log.warn('Your Ember app (or other code) has made the window unresponsive.');
  });

  mainWindow.on('responsive', () => {
    log.info('The main window has become responsive again.');
  });

  mainWindow.on('closed', () => {
    subprocess.kill();
    mainWindow = null;
  });
};

// Handle an unhandled error in the main thread
//
// Note that 'uncaughtException' is a crude mechanism for exception handling intended to
// be used only as a last resort. The event should not be used as an equivalent to
// "On Error Resume Next". Unhandled exceptions inherently mean that an application is in
// an undefined state. Attempting to resume application code without properly recovering
// from the exception can cause additional unforeseen and unpredictable issues.
//
// Attempting to resume normally after an uncaught exception can be similar to pulling out
// of the power cord when upgrading a computer -- nine out of ten times nothing happens -
// but the 10th time, the system becomes corrupted.
//
// The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated
// resources (e.g. file descriptors, handles, etc) before shutting down the process. It is
// not safe to resume normal operation after 'uncaughtException'.
process.on('uncaughtException', (err) => {
  log.error('An exception in the main thread was not handled.');
  log.error('This is a serious issue that needs to be handled and/or debugged.');
  log.error(`Exception: ${err}`);
});

process.on('unhandledRejection', (reason) => {
  log.error('An rejected promise in the main thread was not handled.');
  log.error('This is a serious issue that needs to be handled and/or debugged.');
  log.error(`Reason: ${reason}`);
});

module.exports = run().catch((err) => {
  log.error('Failed to run:', err);
});
