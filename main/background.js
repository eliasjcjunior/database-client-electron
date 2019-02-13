import { join } from 'path'
import { app, BrowserWindow, ipcMain } from 'electron';
import { enableHotReload } from './helpers'

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
    maximizable: false,
    show: false
  });
  modalScreen.hide();
  modalScreen.webContents.on('close', () => {
    modalScreen.hide();
  });
  homeScreen.hide();

  homeScreen.webContents.on('close', () => {
    app.quit();
  });

  if (isProd) {
    const homeFile = join(app.getAppPath(), 'app/home/index.html');
    const modalFile = join(app.getAppPath(), 'app/connection-manager/index.html');
    homeScreen.loadFile(homeFile);
    modalScreen.loadFile(modalFile);
  } else {
    modalScreen.loadURL(`${host}${uri.connectionManager}`);
    modalScreen.webContents.on('did-finish-load', () => {
      // Home
      homeScreen.loadURL(`${host}${uri.home}`);
      homeScreen.webContents.on('close', () => {
        app.quit();
      });
    });
  }
});

ipcMain.on('call-new-connection', (event, args) => {
  homeScreen.center();
  homeScreen.show();
  homeScreen.webContents.send('message', args);
  modalScreen.hide();
});

ipcMain.on('call-connection-manager', (event, args) => {
  if (isProd) {
    const modalFile = join(app.getAppPath(), 'app/connection-manager/index.html');
    modalScreen.loadFile(modalFile);
  } else {
    modalScreen.loadURL(`${host}${uri.connectionManager}`);
  }
  modalScreen.webContents.on('did-finish-load', () => {
    modalScreen.center();
    modalScreen.show();
    modalScreen.webContents.send('message', args);
  });
});

ipcMain.on('call-connection-settings',  (event, args) => {
  if (isProd) {
    const modalFile = join(app.getAppPath(), 'app/connections-settings/index.html');
    modalScreen.loadFile(modalFile);
  } else {
    modalScreen.loadURL(`${host}${uri.connectionSettings}`);
  }
  modalScreen.webContents.on('did-finish-load', () => {
    modalScreen.show();
    modalScreen.webContents.send('message', args);
  });
});

app.on('window-all-closed', () => {
  app.quit()
});