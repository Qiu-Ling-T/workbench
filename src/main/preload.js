const { contextBridge, ipcRenderer, shell } = require('electron');

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 示例API，可以根据需要扩展
  sendMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  onMessage: (channel, callback) => {
    const validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      // 避免暴露原始的回调函数
      const newCallback = (event, ...args) => callback(...args);
      ipcRenderer.on(channel, newCallback);
      return () => ipcRenderer.removeListener(channel, newCallback);
    }
    return () => {};
  },
  // 打开外部链接
  openExternal: (url) => {
    shell.openExternal(url).catch(err => console.error('无法打开外部链接:', err));
  }
});