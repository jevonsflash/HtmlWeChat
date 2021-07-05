import { app, BrowserWindow, ipcRenderer, ipcMain } from 'electron'
const ipc = ipcMain

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  (global as any).__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow, transferWindow, loginWindow
let mainIpc, transferIpc, loginIpc
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

  mainWindow.on('focus', () => {
    if (transferWindow && transferWindow.isVisible()) {
      transferIpc.send('hide')
      transferWindow.hide()
    }
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
function createTransferWindow() {
  let msg, mainBound

  transferWindow = new BrowserWindow({
    height: 430,
    width: 300,
    frame: false,
    show: false,
    resizable: false,
    minimizable: false,
    maximizable: false,
    parent: mainWindow,
    webPreferences: {
      backgroundThrottling: false
    }
  })

  transferWindow.loadURL(winURL + '#/transfer')

  transferWindow.on('closed', () => {
    transferWindow = null
  })

  transferWindow.once('ready-to-show', event => {
    transferIpc = event.sender
  })

  ipc.on('open_transfer_window', function (event_main, _msg) {
    msg = _msg

    transferIpc.send('transfer_show', msg)

    // 聊天区域居中转账框
    mainBound = mainWindow.getBounds()
    transferWindow.setPosition(
      mainBound.x + 310 + (mainBound.width - 310) / 2 - 150,
      mainBound.y + mainBound.height / 2 - 215
    )


    transferWindow.show()

    // 转账窗口发布消息到主窗口
    ipc.on('transfer_pub_msg', (event, pub_msg) => {
      // 发送到主窗口
      event_main.sender.send('transfer_on_msg', pub_msg)
    })
  })
}

app.on('ready', () => {
  createWindow()
  createTransferWindow()
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
  } else if (transferWindow === null) {
    createTransferWindow()
  }
  else if (loginWindow === null) {
    createLoginWindow()
  }
})

//登录窗口最小化
ipc.on('window-min', function () {
  mainWindow.minimize()
})
//登录窗口最大化
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
