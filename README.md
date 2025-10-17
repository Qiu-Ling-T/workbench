# Electron React Workbench

一个基于 Electron 和 React 构建的跨平台桌面应用程序，集成了待办事项管理和多平台搜索功能。

## 技术栈

- **Electron** - 跨平台桌面应用开发框架
- **React** - 用于构建用户界面的 JavaScript 库
- **Webpack** - 模块打包工具
- **Babel** - JavaScript 编译器
- **CSS Loader/Style Loader** - CSS 处理工具

## 功能特点

- **待办事项管理 (TodoApp)**
  - 创建、编辑和删除待办事项
  - 待办事项状态管理

- **多平台搜索功能 (SearchApp)**
  - 支持多个搜索平台（Bing、Google、京东、拼多多、淘宝）
  - 自定义添加新的搜索平台
  - 设置默认搜索平台
  - 快速切换不同平台进行搜索

- **开发友好**
  - 开发环境下自动打开 Chrome DevTools
  - 模块化的代码结构，易于扩展
  - 响应式设计，适配不同屏幕尺寸

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器并运行应用：

```bash
npm run dev
```

这将执行以下操作：
1. 构建主进程和渲染进程代码
2. 启动 Electron 应用
3. 开发环境下自动打开 DevTools

### 构建应用

#### 构建代码

```bash
npm run build
```

这将编译主进程和渲染进程代码到 `dist` 目录。

#### 打包应用

```bash
npm run package
```

这将使用 electron-builder 打包应用到 `build` 目录，支持各平台分发。

## 项目结构

```
├── src/
│   ├── main/           # 主进程代码
│   │   ├── main.js     # 应用入口
│   │   └── preload.js  # 预加载脚本
│   ├── renderer/       # 渲染进程代码
│   │   ├── App.jsx     # React 应用入口
│   │   ├── components/ # React 组件
│   │   ├── modules/    # 功能模块
│   │   └── utils/      # 工具函数
│   └── common/         # 共享代码
├── public/             # 静态资源
├── webpack.config.js   # 渲染进程 webpack 配置
├── webpack.main.config.js # 主进程 webpack 配置
└── package.json        # 项目依赖和脚本
```

## 许可证

该项目采用 ISC 许可证。详见 [LICENSE](LICENSE) 文件。

## 贡献

欢迎提交 Issues 和 Pull Requests 来帮助改进这个项目。