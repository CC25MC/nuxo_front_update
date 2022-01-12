const { contextBridge, ipcRenderer, shell } = require("electron");
const fs = require("fs");
const path = require("path");
const isDev = require('electron-is-dev')


const dbProductionPath = path.join(
  __dirname
  , '../../../static/aidy.sqlite3'
)

const executablePath = path.join(
  __dirname
  , '../../../app.asar.unpacked/node_modules/puppeteer/.local-chromium/win64-901912/chrome-win/chrome.exe'
)

const dbPath = path.join(
  __dirname,
  './db.sqlite3'
)


// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

contextBridge.exposeInMainWorld("server", () => {
  ipcRenderer.send('server-on');
});


contextBridge.exposeInMainWorld("openExternal", (url) => {
  shell.openExternal(url);
});

contextBridge.exposeInMainWorld('path',executablePath);

