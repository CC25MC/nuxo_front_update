'use strict';
const { app, BrowserWindow, Menu, ipcMain, ipcRenderer, Tray } = require('electron')
const { autoUpdater } = require("electron-updater");
const path = require('path')
const isDev = require('electron-is-dev')
require('@electron/remote/main').initialize()
var child = require('child_process').execFile;
const iconPath = path.join(__dirname, "images/favicon-16x16.png");
const pluginPath = isDev ? path.join(
  __dirname,
  '../statico/nuxo-win'
) : path.join(__dirname, '../../../statico/nuxo-win.exe');
//  file://C:\Users\cesar\AppData\Local\Programs\Nuxo\resources\app.asar\build

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

var win;
var trayIcon;

function sendStatusToWindow(option, text) {
  if (option === "message")
    win.webContents.send('message', text);
}

const server = () => {
  child(pluginPath, {
    env: {
      PORT: 5000,
      PRIVATEKEY: "scr3t3k3yb0l3t4scr4p1ng"
    },
    cwd: isDev ? path.join(
      __dirname,
      '../statico'
    ) : path.join(__dirname, '../../../resources/statico'),
    windowsHide: true,
  }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data.toString());
  });
}

function createWindow() {
  // Create the browser window.
  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);
  win = new BrowserWindow({
    width: 800,
    height: 600,
    // show: false,
    icon: iconPath,
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

}

const tray = () => {
  trayIcon = new Tray(iconPath);
  trayIcon.setToolTip('Nuxo');
  trayIcon.on('click', (event) => {
    win.isVisible() ? win.hide() : win.show();
  });
}

app.on('ready', () => {
  server();
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();

  win.on('close', function () {
    win = null;
  });
  win.on('blur', function () {
    win.hide();
  });
  tray();
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