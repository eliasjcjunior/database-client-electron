import {join} from 'path'
import {app, BrowserWindow, ipcMain} from 'electron';
import {enableHotReload} from './helpers'

const isProd = process.env.NODE_ENV === 'production';

global.modalScreen = null;
global.homeScreen = null;
global.connectionSettingsScreen = null;

const host = 'http://localhost:8888';
const uri = {
  connectionManager: '/connection-manager',
  connectionSettings: '/connections-settings',
  home: '/home'g
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
  homeScreen.hide();
  connectionSettingsScreen = new BrowserWindow({
    width: 600,
    height: 600,
    resizable: false,
    maximizable: false,
    title: 'Connection Settings'
  });
  connectionSettingsScreen.hide();

  modalScreen.webContents.on('close', () => {
    app.quit();
  });

  if (isProd) {
    const homeFile = join(app.getAppPath(), 'app/home/index.html');
    const modalFile = join(app.getAppPath(), 'app/connection-manager/index.html');
    const connectionSettingsFiles = join(app.getAppPath(), 'app/connections-settings/index.html');
    homeScreen.loadFile(homeFile);
    modalScreen.loadFile(modalFile);
    connectionSettingsScreen.loadFile(connectionSettingsFiles);
  } else {
    modalScreen.loadURL(`${host}${uri.connectionManager}`);
    modalScreen.webContents.openDevTools();
    modalScreen.webContents.on('did-finish-load', () => {
      // Home
      homeScreen.loadURL(`${host}${uri.home}`);
      homeScreen.webContents.openDevTools();
      homeScreen.hide();
      homeScreen.webContents.on('close', () => {
        app.quit();
      });
      // Connection Settings
      connectionSettingsScreen.loadURL(`${host}${uri.connectionSettings}`);
      connectionSettingsScreen.hide();
    });

    // Prevent from destroying connection settings screen
    connectionSettingsScreen.on('close', event => {
      event.preventDefault();
      connectionSettingsScreen.hide();
    });
  }
});

ipcMain.on('call-home', (event, args) => {
  homeScreen.center();
  homeScreen.show();
  homeScreen.webContents.send('message', args);
  modalScreen.hide();
});

ipcMain.on('call-connection-settings', (event, args) => {
  connectionSettingsScreen.center();
  connectionSettingsScreen.show();
  connectionSettingsScreen.webContents.send('message', args);
});

app.on('window-all-closed', () => {
  app.quit()
});
