const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const path = require('path')
const Positioner = require('electron-positioner')
const isDev = require('electron-is-dev')
require('@electron/remote/main').initialize()
var child = require('child_process').execFile;
const fs = require("fs")


const iconPath = path.join(__dirname, "images/favicon-16x16.png");
const pluginPath = isDev ? path.join(
  __dirname,
  '../statico/nuxo-win'
) : path.join(__dirname, '../../statico/nuxo-win.exe');

const template = [
  {
    label: 'Ayuda',
    submenu: [
      { label: 'Documentación' }
    ]
  }
]

let win;
var trayIcon;

const server = () => {
  fs.access(pluginPath, (error) => {
    if (error) {
      console.log("Directorio no existe");
      win.webContents.send('message', "descargar servidor");
    }
    else {
      console.log("Directorio existe");
      child(pluginPath, {
        cwd: isDev ? path.join(
          __dirname,
          '../statico'
        ) : path.join(__dirname, '../../statico'),
        windowsHide: true,
      }, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data.toString());
      });
    }
  }
  )
}

ipcMain.on('restart_app', (event, arg) => {
  //autoUpdater.quitAndInstall();
  server();
});

function createWindow() {
  // Create the browser window.
  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);
  win = new BrowserWindow({
    width: 470,
    height: 600,
    // show: false,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true
    }
  })
  // win.setMenu(null);
  // const primaryDisplay =  screen.getPrimaryDisplay()
  // console.log(primaryDisplay.workAreaSize);
  var positioner = new Positioner(win);
  positioner.move('bottomRight')
  // win.setPosition();
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  win.on('close', function (event) {
    win.hide();
    event.preventDefault()
  });
}

const tray = () => {
  trayIcon = new Tray(iconPath);
  trayIcon.setToolTip('Nuxo');
  trayIcon.on('click', (event) => {
    win.show();
  });

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Cerrar Aplicación', click: () => {
        win.hide();
        win = null
        app.quit();
      }
    }
  ])
  trayIcon.setContextMenu(contextMenu)
}

app.on('ready', () => {
  createWindow();
  tray();
});
// app.on('browser-window-created', function () {
//   win.webContents.send('message', "descargar servidor");
// })
app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
