const BaseConfig = require('./webpack.base.js')
const WebpackMerge = require('webpack-merge')
const CompressionPlugin  = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

const config = WebpackMerge.merge(BaseConfig, {
  mode: 'production',
  plugins: [new CompressionPlugin({
    test: /.(js|css)$/, // 只生成css,js压缩文件
    filename: '[path][base].gz', // 文件命名
    algorithm: 'gzip', // 压缩格式,默认是gzip
    test: /.(js|css)$/, // 只生成css,js压缩文件
    threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
    minRatio: 0.8 // 压缩率,默认值是 0.8
  })],
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
