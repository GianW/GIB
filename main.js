const {app, BrowserWindow, ipcMain, nativeImage, globalShortcut} = require('electron')
const path = require('path');

const { setMainMenu } = require('./src/core/main-menu');

let windows = [];

let State = {};

function createWindow() {

  const win = new BrowserWindow({
    height: 600,
    width: 800 ,
    titleBarStyle: 'hidden',
    icon: `${app.getAppPath()}/assets/icon.png`,
    // alwaysOnTop: true,
    webPreferences: {
        nodeIntegration: true
    }
  });

  // win.maximize();

  // Adicionando um ícone na barra de tarefas/dock
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/assets/icon.png`);

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  win.loadURL(path.join('file://', __dirname, '/src/index.html'));

  setMainMenu(win);

  windows.push(win);

  win.on('close', () => {
    windows.splice(windows.indexOf(win), 1);
  });
};

function toggleDevTools() {
  if(windows[0]){
    windows[0].toggleDevTools()
  }
};

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools);
};

function setInitialState(){
  State.menus = [{
    name: "Pedido de Peças",
    icon: "inbox"
  }];
};

function getMenus(event){
  event.returnValue = State.menus;
};

app.on('ready', () =>{
  createWindow();
  createShortcuts();
  setInitialState();

  ipcMain.on('get-userMenus', getMenus);

});

// Finaliza quando todas as janelas estiverem fechadas.
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});