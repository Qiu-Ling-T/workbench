const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 主进程配置
const mainConfig = {
  mode: 'development',
  entry: './src/main/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/main'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()], // 只在主配置中使用CleanWebpackPlugin
  devtool: 'source-map',
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
};

// Preload脚本配置
const preloadConfig = {
  mode: 'development',
  entry: './src/main/preload.js',
  output: {
    filename: 'preload.js',
    path: path.resolve(__dirname, 'dist/main'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devtool: 'source-map',
  target: 'electron-preload', // 关键修改：使用正确的编译目标
  node: {
    __dirname: false,
    __filename: false,
  },
};

// 导出两个配置，webpack会分别处理
module.exports = [mainConfig, preloadConfig];