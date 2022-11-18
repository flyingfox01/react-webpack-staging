const BaseConfig = require('./webpack.base.js')
const WebpackMerge = require('webpack-merge')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

const config = WebpackMerge.merge(BaseConfig, {
  mode: 'production',
  optimization: {
    runtimeChunk: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: 4,
      }),
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
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

module.exports = config
