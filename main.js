// This is free and unencumbered software released into the public domain.
// See LICENSE for details

const { app, BrowserWindow, Menu } = require('electron');
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");
//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

//-------------------------------------------------------------------
// Define the menu
//
// THIS SECTION IS NOT REQUIRED
//-------------------------------------------------------------------
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


//-------------------------------------------------------------------
// Open a window that displays the version
//
// THIS SECTION IS NOT REQUIRED
//
// This isn't required for auto-updates to work, but it's easier
// for the app to show a window than to have to click "About" to see
// that updates are working.
//-------------------------------------------------------------------
let update;
let win;

function sendStatusToWindow(option, text) {
  if (option === "message") {
    log.info(text);
    update.webContents.send('message', text);
    if (text === "No hay Actualizaciones") {
      update.close();
    } else if (text === "Actualización Disponible.") {
      update.show();
    }
  } else {
    log.info(text);
    update.webContents.send('progressbar', text);
  }
}
function createUpdateWindow() {
  update = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  // win.webContents.openDevTools();
  update.on('closed', () => {
    update = null;
  });
  update.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);

}

setInterval(() => {
  autoUpdater.checkForUpdates();
}, 60000)

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
  let log_message = progressObj.percent
  sendStatusToWindow("progressbar", log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow("message", 'Actualización Descargada');
  autoUpdater.quitAndInstall();
});
app.on('ready', function () {
  // Create the Menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  createUpdateWindow();
});
app.on('window-all-closed', () => {
  app.quit();
});

//
// CHOOSE one of the following options for Auto updates
//

//-------------------------------------------------------------------
// Auto updates - Option 1 - Simplest version
//
// This will immediately download an update, then install when the
// app quits.
//-------------------------------------------------------------------
app.on('ready', function () {
  autoUpdater.checkForUpdatesAndNotify();
});

//-------------------------------------------------------------------
// Auto updates - Option 2 - More control
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//
// The app doesn't need to listen to any events except `update-downloaded`
//
// Uncomment any of the below events to listen for them.  Also,
// look in the previous section to see them being used.
//-------------------------------------------------------------------
// app.on('ready', function()  {
//   autoUpdater.checkForUpdates();
// });
// autoUpdater.on('checking-for-update', () => {
// })
// autoUpdater.on('update-available', (info) => {
// })
// autoUpdater.on('update-not-available', (info) => {
// })
// autoUpdater.on('error', (err) => {
// })
// autoUpdater.on('download-progress', (progressObj) => {
// })
// autoUpdater.on('update-downloaded', (info) => {
//   autoUpdater.quitAndInstall();  
// })
