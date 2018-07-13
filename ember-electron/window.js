const path = require('path');

const electron = require('electron');
const log = require('electron-log');
const windowState = require('electron-window-state');
const { is } = require('electron-util');

const {
  version,
  productName,
  homepage,
  author: { email },
} = require('../package');

const {
  shell,
  Menu,
  BrowserWindow,
} = electron;

const createWindow = () => {
  const {
    workAreaSize: {
      width: maxWidth,
      height: maxHeight,
    },
  } = electron.screen.getPrimaryDisplay();

  const mainWindowState = windowState({
    defaultWidth: Math.min(maxWidth, 1280),
    defaultHeight: Math.min(maxHeight, 768),
  });

  const {
    x,
    y,
    width,
    height,
  } = mainWindowState;

  const icon = path.join(global.resourcesPath, 'icon.png');
  const win = new BrowserWindow({
    icon,
    x,
    y,
    width,
    height,
    minWidth: 320,
    minHeight: 720,
    show: false,
    center: true,
    darkTheme: true,
    transparent: true,
    scrollBounce: true,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#000034',
    title: productName,
    tabbingIdentifier: productName,
    webPreferences: {
      webviewTag: false,
    },
  });

  win.setAutoHideMenuBar(true);
  win.setMenuBarVisibility(false);
  mainWindowState.manage(win);

  const template = [
    { role: 'editMenu' },
    {
      label: 'View',
      submenu: [
        { role: 'toggleFullScreen' },
        { type: 'separator' },
        { role: 'toggleDevTools' },
      ],
    },
    { role: 'windowMenu' },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            return shell.openExternal(homepage);
          },
        },
        {
          label: 'Report Issue',
          click() {
            const subject = `${productName} Issue Report`;
            const body = `Version: ${version}\r\nPlatform: ${process.platform}`;
            const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            return shell.openExternal(url);
          },
        },
        {
          label: 'View Logs',
          click() {
            const { file } = log.transports.file;
            return shell.showItemInFolder(file);
          },
        },
      ],
    },
  ];

  if (is.macos) {
    template.unshift({
      label: productName,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // win.once('ready-to-show', () => win.show());

  win.on('close', (event) => {
    if (is.macos && !global.isQuitting) {
      event.preventDefault();
      win.hide();
    }
  });

  win.on('unresponsive', () => {
    log.warn('Application window has become unresponsive:', win.getTitle());
  });

  win.on('responsive', () => {
    log.info('Application window has become responsive again:', win.getTitle());
  });

  const emberAppLocation = 'serve://dist';

  // Load the ember application using our custom protocol/scheme
  win.loadURL(emberAppLocation);

  win.webContents.once('dom-ready', () => {
    log.info('Application window ready to show:', win.getTitle());
    win.show();
  });

  // If a loading operation goes wrong, we'll send Electron back to
  // Ember App entry point
  win.webContents.on('did-fail-load', () => {
    if (!win.isDestroyed()) {
      win.loadURL(emberAppLocation);
    }
  });

  win.webContents.on('crashed', () => {
    log.error('Application in window has crashed:', win.getTitle());
  });

  return win;
};

module.exports = {
  createWindow,
};
