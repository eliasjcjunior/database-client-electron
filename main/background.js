import {join} from 'path'
import {app, BrowserWindow} from 'electron'
import {createWindow, enableHotReload} from './helpers'

const isProd = process.env.NODE_ENV === 'production'

if (!isProd) {
  enableHotReload()

  const userDataPath = app.getPath('userData')
  app.setPath('userData', `${userDataPath} (development)`)
}

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 550,
    height: 350,
    resizable: false,
    maximizable: false
  });

  if (isProd) {
    const homeFile = join(app.getAppPath(), 'app/home/index.html')
    mainWindow.loadFile(homeFile)
  } else {
    const homeUrl = 'http://localhost:8888/home'
    mainWindow.loadURL(homeUrl)
    mainWindow.webContents.openDevTools()
  }
})

app.on('window-all-closed', () => {
  app.quit()
})
