const chalk = require('chalk')
const config = require('./webpack.prod.js')

const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const smp = new SpeedMeasurePlugin();
 
config.plugins.push(...[
  // 进度条
  new ProgressBarPlugin({
    format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
  }),
  // 打包体积分析
  new BundleAnalyzerPlugin(),
])

module.exports = smp.wrap(config)
