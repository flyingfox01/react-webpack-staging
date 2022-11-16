const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

 
module.exports = {
  mode: 'development',
  entry: {
    page1: ["@babel/polyfill", path.resolve(__dirname, './src/page1.js')],
    page2: ["@babel/polyfill", path.resolve(__dirname, './src/page2.js')]
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/page1.html'),
      filename: 'page1.html',
      chunks: ['page1']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/page2.html'),
      filename: 'page2.html',
      chunks: ['page2']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,// css后缀文件
      use: ['style-loader', 'css-loader']// 从右向左解析原则
    }, {
      test: /\.less$/,// css后缀文件
      use: [
        MiniCssExtractPlugin.loader, 
        'css-loader', 
        {
          loader:'postcss-loader',
          // 配置参数
          options:{
            postcssOptions:{
              // 添加前缀
                plugins:[
                  require('autoprefixer')({
                    overrideBrowserslist: [
                      "last 2 version",
                      "> 1%",
                      "iOS >= 7",
                      "Android > 4.1",
                      "Firefox > 20"
                    ]
                  }),
                  require('postcss-preset-env')
                ]
             }
          }
        }, 
        'less-loader'
       ]// 从右向左解析原则
    },
    {
      test: /\.(jpe?g|png|gif)$/i, //图片文件
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                  name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }
      ]
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      ]
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[hash:8].[ext]'
              }
            }
          }
        }
      ]
    },
    { 
      test:/\.js$/, 
      use:{ 
        loader:'babel-loader', 
        options:{  
          presets:[
            '@babel/preset-react',
            '@babel/preset-env'
          ] 
        }
      }, 
      exclude: /node_modules/ 
    },
  ]}
}