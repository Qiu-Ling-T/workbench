const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // 基本消息通信API
  sendMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  onMessage: (channel, callback) => {
    const validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      const newCallback = (event, ...args) => callback(...args);
      ipcRenderer.on(channel, newCallback);
      return () => ipcRenderer.removeListener(channel, newCallback);
    }
    return () => {};
  },
  // 通过IPC调用主进程打开外部链接(默认浏览器)
  openExternal: async (url) => {
    return await ipcRenderer.invoke('openExternal', url);
  },
  // 通过IPC调用主进程打开内部浏览器
  openInternalBrowser: async (url) => {
    return await ipcRenderer.invoke('openInternalBrowser', url);
  }
});