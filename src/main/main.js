const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // 加载构建后的渲染进程HTML文件
  win.loadFile(path.join(__dirname, '../renderer/index.html'));

  // 开发环境下打开调试工具
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
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