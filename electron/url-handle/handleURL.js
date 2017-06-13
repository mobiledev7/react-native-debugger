import { app } from 'electron';
import net from 'net';
import url from 'url';
import qs from 'querystring';
import fs from 'fs';
import * as portfile from './port';

const filterPaths = list => {
  const filteredList = list.filter(dir => {
    try {
      return fs.lstatSync(dir).isDirectory();
    } catch (e) {
      return false;
    }
  });
  if (!filteredList.length) {
    return;
  }
  return filteredList;
};

const handleURL = async (getWindow, path) => {
  const route = url.parse(path);

  if (route.host !== 'set-debugger-loc') return;

  const { host, port, projectRoots } = qs.parse(route.query);
  const query = {
    host: host || 'localhost',
    port: Number(port) || 8081,
    projectRoots: Array.isArray(projectRoots) ? filterPaths(projectRoots.split(',')) : undefined,
  };
  const payload = JSON.stringify(query);

  // This env will be get by new debugger window
  process.env.DEBUGGER_SETTING = payload;
  const win = await getWindow(query.host, query.port);
  // if we can get the exists window, it will send the IPC event
  if (win) {
    win.webContents.send('set-debugger-loc', payload);
  }
};

const listenOpenURL = getWindow =>
  app.on('open-url', (e, path) => {
    handleURL(getWindow, path);
  });

const createHandleURLServer = getWindow =>
  net
    .createServer(socket => {
      socket.setEncoding('utf-8');
      socket.on('data', async data => {
        try {
          const obj = JSON.parse(data);
          if (typeof obj.path === 'string') {
            await handleURL(getWindow, obj.path);
          }
          socket.write('success');
        } catch (e) {
          socket.write('fail');
        } finally {
          socket.end();
        }
      });
    })
    .listen(0, 'localhost')
    .on('listening', function server() {
      const { port } = this.address();
      portfile.write(port);
      portfile.watchExists(port);
      process.on('exit', () => portfile.unlink());

      console.log(`Starting listen set-debugger-loc request on port ${port}`);
      console.log('Will save port to `$HOME/.rndebugger_port` file');
    });

export default getWindow => {
  // Handle set-debugger-loc for macOS
  // It's can be automatically open the app
  listenOpenURL(getWindow);
  // Handle set-debugger-loc for macOS/Linux/Windows
  createHandleURLServer(getWindow);
};
