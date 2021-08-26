const { app, BrowserWindow }  = require('electron')
const path = require('path');
const cv = require('opencv4nodejs')

app.allowRendererProcessReuse = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadURL(path.resolve(__dirname, '../', 'build/index.html'))

  mainWindow.webContents.openDevTools()
  mainWindow.setResizable(true)
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})