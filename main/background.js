import { join } from 'path'
import { app, BrowserWindow, ipcMain } from 'electron';
import { enableHotReload } from './helpers'

const isProd = process.env.NODE_ENV === 'production';

let mainScreen = null;

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
  mainScreen = new BrowserWindow({
    width: 800,
    height: 800,
    resizable: false,
    maximizable: false
  });
  mainScreen.webContents.on('close', () => {
    app.quit();
  });

  loadConnectionManager();
});

ipcMain.on('call-home', () => {
  loadHome();
});

ipcMain.on('call-connection-manager', () => {
  loadConnectionManager();
});

const loadConnectionManager = () => {
  navigateTo('app/connection-manager/index.html', uri.connectionManager);
};

const loadHome = () => {
  navigateTo('app/home/index.html', uri.home);
};

const navigateTo = (route, routeOnDev = uri.home) => {
  if (isProd) {
    const fileAddress = join(app.getAppPath(), route);
    mainScreen.loadFile(fileAddress);
  } else {
    mainScreen.loadURL(`${host}${routeOnDev}`);
  }
};

app.on('window-all-closed', () => {
  app.quit()
});