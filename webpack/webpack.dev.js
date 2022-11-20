const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const BaseConfig = require('./webpack.base.js')
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge.merge(BaseConfig,{
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ],
  devServer: {
    port: 3000,
    hot: true,
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    compress: true
  }
});
