const path = require('path');

const BaseConfig = require('./webpack.base.js')
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge.merge(BaseConfig,{
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    hot: true,
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    compress: true
  }
});
