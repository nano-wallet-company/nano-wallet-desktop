const electron = require('electron');
const windowState = require('electron-window-state');
const { is } = require('electron-util');

const { productName: title } = require('../package');
const { getApplicationMenu } = require('./menu');
const { getIconPath } = require('./utils');

const { BrowserWindow, Menu } = electron;

const getWindowState = () => {
  const {
    workAreaSize: {
      width: maxWidth,
      height: maxHeight,
    },
  } = electron.screen.getPrimaryDisplay();

  return windowState({
    defaultWidth: Math.min(maxWidth, 1280),
    defaultHeight: Math.min(maxHeight, 768),
  });
};

const createWindow = async () => {
  const windowStateManager = getWindowState();
  const {
    x,
    y,
    width,
    height,
  } = windowStateManager;

  const icon = getIconPath();
  const window = new BrowserWindow({
    title,
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
    scrollBounce: true,
    vibrancy: 'appearance-based',
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#000034',
    webPreferences: {
      webviewTag: false,
      disableBlinkFeatures: 'Auxclick',
    },
  });

  window.setAutoHideMenuBar(true);
  window.setMenuBarVisibility(false);
  windowStateManager.manage(window);

  const menu = getApplicationMenu();
  Menu.setApplicationMenu(menu);

  window.on('close', (event) => {
    if (is.macos && !global.isQuitting && !global.isUpdating) {
      event.preventDefault();
      window.hide();
    }
  });

  return window;
};

module.exports = {
  createWindow,
};
