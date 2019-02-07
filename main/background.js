import {join} from 'path'
import {app, BrowserWindow, ipcMain, screen} from 'electron';
import { enableHotReload } from './helpers'

const isProd = process.env.NODE_ENV === 'production';

global.modalScreen = null;
global.homeScreen = null;

const host = 'http://localhost:8888';
const uri = {
  connectionManager: '/connection-manager',
  home: '/home'
}

if (!isProd) {
  enableHotReload()

  const userDataPath = app.getPath('userData')
  app.setPath('userData', `${userDataPath} (development)`)
}


app.on('ready', () => {
  modalScreen = new BrowserWindow({
    width: 800,
    height: 500,
    resizable: false,
    maximizable: false
  });

  modalScreen.webContents.on('close', () => {
    app.quit();
  });

  if (isProd) {
    const homeFile = join(app.getAppPath(), 'app/home/index.html');
    const modalFile = join(app.getAppPath(), 'app/connection-manager/index.html');
    homeScreen.loadFile(homeFile);
    modalScreen.loadFile(modalFile)
  } else {
    modalScreen.loadURL(`${host}${uri.connectionManager}`);
    modalScreen.webContents.openDevTools();
    modalScreen.webContents.on('did-finish-load', () => {
      homeScreen = new BrowserWindow({
        width: 1200,
        height: 1000,
        resizable: false,
        maximizable: false
      });
      homeScreen.loadURL(`${host}${uri.home}`);
      homeScreen.webContents.openDevTools();
      homeScreen.hide();
      homeScreen.webContents.on('close', () => {
        app.quit();
      });
    });
    
  }
});

ipcMain.on('call-home', (event, args) => {
  homeScreen.center();
  homeScreen.show();
  homeScreen.webContents.send ('message', args);
  modalScreen.hide();
});

app.on('window-all-closed', () => {
  app.quit()
})
