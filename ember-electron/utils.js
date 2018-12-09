const path = require('path');
const { is } = require('electron-util');

const getIconExtension = () => (is.windows ? '.ico' : '.png');

const getIconPath = (ext = getIconExtension()) => path.format({
  ext,
  name: 'icon',
  dir: global.resourcesPath,
});

module.exports = {
  getIconPath,
};
