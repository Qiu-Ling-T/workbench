const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
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
  plugins: [new CleanWebpackPlugin()],
  devtool: 'source-map',
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
};