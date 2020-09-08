const { app, Menu, BrowserWindow  } = require('electron');
const isWindows = process.platform === 'win32';

// const { showMessage, showSaveDialog, showOpenDialog } = require('./dialog');

module.exports = {
  setMainMenu
};

function setMainMenu(mainWindow) {
  const template = [];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(null);
}