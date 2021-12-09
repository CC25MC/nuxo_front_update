const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const { autoUpdater } = require("electron-updater");
const path = require('path')
const isDev = require('electron-is-dev')
var child = require('child_process').execFile;
const pluginPath = path.join(
  __dirname,
  '../src/statico/scraping-eboleta'
);
var parameters = ["--incognito", "--shell"];
require('@electron/remote/main').initialize()

let template = []
if (process.platform === 'darwin') {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  })
}

// let update;
let win;

function sendStatusToWindow(option, text) {
  if (option === "message")
    win.webContents.send('message', text);
}

function createWindow() {
  // Create the browser window.
  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: false,
      contextIsolation: false
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  // if (!isDev) {
  //   update = new BrowserWindow({
  //     width: 350,
  //     height: 200,
  //     webPreferences: {
  //       nodeIntegration: true,
  //       contextIsolation: false
  //     }
  //   });
  //   // win.webContents.openDevTools();
  //   update.on('closed', () => {
  //     update = null;
  //   });
  //   update.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
  // }

}

app.on('ready', () => {
  createWindow();
  child(pluginPath, {
    env: {
      PORT:5000,
      PRIVATEKEY:"scr3t3k3yb0l3t4scr4p1ng"
    },
    cwd: path.join(
       __dirname,
       '../src/statico'),
    windowsHide: true,
  }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data.toString());
  });
  autoUpdater.checkForUpdatesAndNotify();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow("message", 'Verificando Actualización...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow("message", 'Actualización Disponible.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow("message", 'No hay Actualizaciones');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow("message", 'Ah Ocurrido un error al descargar la actualización' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  win.webContents.send('progressbar', progressObj.percent);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow("message", 'Actualización Descargada');
});

ipcMain.on('restart_app', (event, arg) => {
  autoUpdater.quitAndInstall();
});

ipcMain.on('update_app', (event, arg) => {
  autoUpdater.checkForUpdates()
});