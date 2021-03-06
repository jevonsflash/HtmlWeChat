import { app, BrowserWindow, ipcRenderer, ipcMain } from 'electron'
const ipc = ipcMain

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow, transferWindow, loginWindow
let mainIpc, loginIpc
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

const menuWidth = 250
function createWindow() {
  mainWindow = new BrowserWindow({
    minHeight: 450,
    minWidth: 600,
    height: 700,
    show: false,
    useContentSize: true,
    width: 1000,
    frame: false,
    backgroundColor: '#ffffff',
    webPreferences: {
      backgroundThrottling: false
    }
  })
  mainWindow.once('ready-to-show', event => {
    mainIpc = event.sender

  })
  ipc.on('expand_main_window', function (event_main, _msg) {
    console.log('expand_main_window recived!')
  let width=  mainWindow.getSize()[0]
  let height=  mainWindow.getSize()[1]
    let newwidth = width + menuWidth;
    mainWindow.setSize(newwidth, height)

  })
  ipc.on('shrink_main_window', function (event_main, _msg) {
    console.log('shrink_main_window recived!')
    let width=  mainWindow.getSize()[0]
  let height=  mainWindow.getSize()[1]
    let newwidth = width - menuWidth;
    mainWindow.setSize(newwidth, height)

  })

  ipc.on('open_main_window', function (event_main, _msg) {
    mainWindow.center()
    mainWindow.show()
    loginWindow.hide()
  })
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  
}
function createLoginWindow() {
  let msg, mainBound

  loginWindow = new BrowserWindow({
    height: 400,
    width: 280,
    frame: false,
    show: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    webPreferences: {
      backgroundThrottling: false
    }
  })

  loginWindow.loadURL(winURL + '#/login')

  loginWindow.on('closed', () => {
    loginWindow = null
  })



  loginWindow.once('ready-to-show', event => {
    loginIpc = event.sender
    loginIpc.send('login_show')
    loginWindow.center()
    loginWindow.show()


  })
}


app.on('ready', () => {
  createWindow()
  createLoginWindow()
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
  else if (loginWindow === null) {
    createLoginWindow()
  }
})

//?????????????????????
ipc.on('window-min', function () {
  mainWindow.minimize()
})
//?????????????????????
ipc.on('window-max', function () {
  if (mainWindow.isMaximized()) {
    mainWindow.restore()
  } else {
    mainWindow.maximize()
  }
})
ipc.on('window-close', function () {
  if (mainWindow) {
    mainWindow.close()
  }
  if (transferWindow) {
    transferWindow.close()
  }
  if (loginWindow) {
    loginWindow.close()
  }
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
