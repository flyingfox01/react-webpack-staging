const BaseConfig = require('./webpack.base.js')
const WebpackMerge = require('webpack-merge')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = WebpackMerge.merge(BaseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({})
    ],
    splitChunks:{
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    }
  }
})
