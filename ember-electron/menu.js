const path = require('path');

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('graceful-fs'), {
  filter(name) {
    return ['readFile'].includes(name);
  },
});

const log = require('electron-log');
const { shell, Menu } = require('electron');
const { default: aboutWindow } = require('about-window');
const { is } = require('electron-util');

const {
  version,
  productName,
  copyright,
  bugs: {
    url,
    email,
  },
} = require('../package');

const { getIconPath } = require('./utils');

const openAboutWindow = async (parent, title) => {
  const iconData = await fs.readFileAsync(getIconPath('.svg'), { encoding: 'base64' });
  return aboutWindow({
    copyright,
    icon_path: `data:image/svg+xml;base64,${iconData}`,
    open_devtools: false,
    use_version_info: false,
    win_options: {
      parent,
      title,
      icon: getIconPath(),
      width: 320,
      height: 360,
      minWidth: 320,
      minHeight: 360,
      darkTheme: true,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      titleBarStyle: 'hiddenInset',
      backgroundColor: '#eee',
      webPreferences: {
        devTools: false,
        webviewTag: false,
        disableBlinkFeatures: 'Auxclick',
      },
    },
  });
};

const aboutMenuItem = (visible = true) => ({
  visible,
  label: `About ${productName}`,
  click(menuItem, browserWindow) {
    const { label } = menuItem;
    return openAboutWindow(browserWindow, label);
  },
});

const getApplicationMenu = () => {
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
        aboutMenuItem(!is.macos),
        {
          label: 'Report Issue',
          click() {
            return shell.openExternal(url);
          },
        },
        {
          label: 'Request Help',
          click() {
            const subject = `${productName} Support Request`;
            const body = `Version: ${version}\r\nPlatform: ${process.platform}`;
            const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            return shell.openExternal(mailto);
          },
        },
        { type: 'separator' },
        {
          label: 'View Logs',
          click() {
            const { file } = log.transports.file;
            return shell.showItemInFolder(file);
          },
        },
        {
          label: 'Open Data Folder',
          click() {
            const dataPath = path.normalize(global.dataPath);
            return shell.showItemInFolder(dataPath);
          },
        },
      ],
    },
  ];

  if (is.macos) {
    template.unshift({
      label: productName,
      submenu: [
        aboutMenuItem(),
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });
  }

  return Menu.buildFromTemplate(template);
};

module.exports = {
  getApplicationMenu,
};
