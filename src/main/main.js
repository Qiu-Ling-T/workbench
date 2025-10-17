const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 加载构建后的渲染进程HTML文件
  win.loadFile(path.join(__dirname, '../renderer/index.html'));

  // 开发环境下打开调试工具
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  // 处理从渲染进程发来的打开外部链接请求(默认浏览器)
  ipcMain.handle('openExternal', async (event, url) => {
    if (typeof url === 'string' && url.startsWith('http')) {
      await shell.openExternal(url);
      return { success: true };
    }
    return { success: false };
  });

  // 处理从渲染进程发来的打开内部浏览器请求
  ipcMain.handle('openInternalBrowser', (event, url) => {
    if (typeof url === 'string' && url.startsWith('http')) {
      const browserWin = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
          contextIsolation: true,
          nodeIntegration: false
        }
      });
      browserWin.loadURL(url);
      return { success: true };
    }
    return { success: false };
  });
}

app.whenReady().then(() => {
  createWindow();

  // macOS 专属事件，点击 Dock 图标时恢复窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // 如果不是macOS系统，关闭所有窗口后退出应用
  if (process.platform !== 'darwin') {
    app.quit();
  }
});