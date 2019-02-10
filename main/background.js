import {join} from 'path'
import {app, BrowserWindow, ipcMain} from 'electron';
import {enableHotReload} from './helpers'

const isProd = process.env.NODE_ENV === 'production';

global.modalScreen = null;
global.homeScreen = null;

const host = 'http://localhost:8888';
const uri = {
  connectionManager: '/connection-manager',
  connectionSettings: '/connections-settings',
  home: '/home'
};

if (!isProd) {
  enableHotReload();
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (development)`);
}

app.on('ready', () => {
  modalScreen = new BrowserWindow({
    width: 800,
    height: 500,
    resizable: false,
    maximizable: false
  });
  homeScreen = new BrowserWindow({
    width: 1200,
    height: 1000,
    resizable: false,
    maximizable: false
  });
  modalScreen.hide();
  modalScreen.webContents.on('close', () => {
    modalScreen.hide();
  });

  homeScreen.webContents.on('close', () => {
    app.quit();
  });

  if (isProd) {
    const homeFile = join(app.getAppPath(), 'app/home/index.html');
    const modalFile = join(app.getAppPath(), 'app/connection-manager/index.html');
    homeScreen.loadFile(homeFile);
    modalScreen.loadFile(modalFile);
  } else {
    homeScreen.loadURL(`${host}${uri.home}`);
    homeScreen.openDevTools();
  }
});

ipcMain.on('call-new-connection', (event, args) => {
  homeScreen.center();
  homeScreen.show();
  homeScreen.webContents.send('message', args);
  modalScreen.hide();
});

app.on('window-all-closed', () => {
  app.quit()
});