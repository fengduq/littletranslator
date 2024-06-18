const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  if(mode === 'dev') { 
    mainWindow.loadURL("http://localhost:3000/")
  } else { 
    mainWindow.loadURL(url.format({
      pathname:path.join(__dirname, './build/index.html'), 
      protocol:'file:', 
      slashes:true 
    }))
  }
  mainWindow.loadFile('index.html')

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
   
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

