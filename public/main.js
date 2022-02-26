const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const path = require('path')
const Positioner = require('electron-positioner')
const isDev = require('electron-is-dev')
require('@electron/remote/main').initialize()
var child = require('child_process').execFile;
const axios = require('axios');
const fs = require("fs")
var https = require('https');
var http = require('http');
const decompress = require('decompress');
var rimraf = require("rimraf");

const iconPath = path.join(__dirname, "images/favicon-16x16.png");
const pluginPath = isDev ? path.join(
  __dirname,
  '../statico/nuxo-win.exe'
) : path.join(__dirname, '../../statico/nuxo-win.exe');

const template = [
  {
    label: 'Ayuda',
    submenu: [
      {
        label: 'Documentación', click: () => {

        }
      },
    ],
  }
]

let win;
var trayIcon;

const download = async () => {

  if (!fs.existsSync('descargas')) {
    fs.mkdirSync('descargas');
  }
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const url = await axios.get(`http://versiones.nuxo.vertragtech.com/versionlast`)
    .then((response) => {
      // handle success
      return response?.data?.url;
    })
    .catch((error) => {
      console.log(error);
    });


  var file = fs.createWriteStream("descargas/file.zip");

  var request = https.get(`https://versiones.nuxo.vertragtech.com/storage/${url}`, { agent }, function (response) {
    response.pipe(file);

    // setDownloadstatus('Descargando');
    win.webContents.send('status', "Descargando");

    var len = parseInt(response.headers['content-length'], 10);
    var body = "";
    var cur = 0;
    var porcentage = "";
    var bytes = "";
    var total = len / 1048576; //1048576 - bytes in  1Megabyte

    win.webContents.send('totalBytes', total);

    response.on("data", function (chunk) {
      body += chunk;
      cur += chunk.length;
      porcentage = parseFloat((100.00 * cur) / len).toFixed(2);
      // setDownloadpercentage(porcentage);
      win.webContents.send('percentage', porcentage);
      bytes = parseFloat(cur / 1048576).toFixed(2);
      // + "mb de " + parseFloat(total).toFixed(2) + "mb"      crear otra variable
      // setDownloadbytes(bytes);
      win.webContents.send('bytes', bytes);
    });


    file.on('finish', function () {
      file.close();
      win.webContents.send('status', "descarga finalizada");
      // setDownloadstatus('descarga finalizada');
    });
  }).on('error', function (err) { // Handle errors
    //fs.unlinkSync("descargas/file.zip"); // Delete the file async. (But we don't check the result)
    console.log(err);
    win.webContents.send('status', "descarga erronea");
    // setDownloadstatus('descarga erronea');
    win.webContents.send('percentage', "");
    // setDownloadpercentage('');
    win.webContents.send('bytes', "");
    // setDownloadbytes('');
  });
}

const server = () => {
  if (fs.existsSync(pluginPath)) {
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
    win.webContents.send('message', "Directorio existe");
  } else {
    //Comienza a descargar
    download()
  }
}

const descomprimir = async () => {

  if (!fs.existsSync('descargas')) {
    fs.mkdirSync('descargas');
  }
  const actual = await axios.get(`http://localhost:9000/api`)
    .then((response) => {
      // handle success
      return response?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  if (actual?.version) {
    //apagar servidor
    var request = await http.get("http://localhost:9000/api/server/close", function (response) {
      // setDecompresstatus('apagando el servidor')
      win.webContents.send('decompress', "apagando el servidor");
    });
    //crear carpeta temp
    if (!fs.existsSync('temp')) {
      fs.mkdirSync('temp');
    }
    //respaldar db
    fs.copyFile('statico/db/data/database.sqlite', 'temp/database.sqlite', (err) => {
      if (err) throw err;
      console.log('source.txt was copied to destination.txt');
    });
    //borrar archivos
    // setDecompresstatus('borrando archivos actuales')
    win.webContents.send('decompress', 'borrando archivos actuales');

    await rimraf("statico", function () { win.webContents.send('decompress', 'archivos borrados'); });
    //crear directorio
    if (!fs.existsSync('statico')) {
      fs.mkdirSync('statico');
    }
    if (!fs.existsSync('statico/db')) {
      fs.mkdirSync('statico/db');
    }
    if (!fs.existsSync('statico/db/data')) {
      fs.mkdirSync('statico/db/data');
    }

  }

  //descomprimir
  await win.webContents.send('decompress', 'descomprimiento archivos');
  const files = decompress('descargas/file.zip', 'statico').then(files => {
    win.webContents.send('decompress', 'archivos descomprimidos con exito');
    // setDecompresstatus('archivos descomprimidos con exito')
    //pegar base de datos
    if (actual?.version) {
      fs.copyFile('temp/database.sqlite', 'statico/db/data/database.sqlite', (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
      });
    }
    rimraf("temp", function () {
      win.webContents.send('decompress', 'archivos borrados');
    });
    //iniciar servidor
    server()
    win.webContents.send('decompress', 'reiniciando servidor');
    // setDecompresstatus('reiniciando servidor')
  });
}

ipcMain.on('restart_app', (event, arg) => {
  //autoUpdater.quitAndInstall();
  server();
});

ipcMain.on('downloadUpdate', (event, arg) => {
  download();
});

ipcMain.on('decompressUpdate', (event, arg) => {
  descomprimir();
});

function createWindow() {
  // Create the browser window.
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
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
        process.exit();
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
