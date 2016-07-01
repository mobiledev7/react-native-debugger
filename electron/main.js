process.env.NODE_ENV = process.env.NODE_ENV || 'production';

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

const { app, BrowserWindow, Menu } = require('electron');
const startListeningHandleURL = require('./handleURL');
const { createContextMenu, createMenuTemplate } = require('./menu');

let mainWindow = null;
const getMainWindow = () => mainWindow;

createContextMenu(getMainWindow);
startListeningHandleURL(getMainWindow);

const menuTemplate = createMenuTemplate(getMainWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 750, show: false });
  mainWindow.loadURL(`file://${__dirname}/app.html`);
  mainWindow.openDevTools();

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  Menu.setApplicationMenu(
    Menu.buildFromTemplate(menuTemplate)
  );
});
