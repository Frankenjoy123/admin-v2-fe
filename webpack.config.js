const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/app.js'
  },
  resolve: {
      alias : {
          page :        path.resolve(__dirname,'./src/page/'),
          component :   path.resolve(__dirname,'./src/component/'),
          service :     path.resolve(__dirname,'./src/service/'),
          util :        path.resolve(__dirname,'./src/util/'),
      }
  },
  module: {
      rules: [
        //react 文件处理
        {
          test: /\.jsx$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env','react']
            }
          }
        },
        // css文件处理
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
            })
        },
        //sass文件处理
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
        },
        //图片的配置
        {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'resource/[name].[ext]'
                }
              }
            ]
        },
        //字体图标的处理
        {
              test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192,
                    name: 'resource/[name].[ext]'
                  }
                }
              ]
        }

      ]
  },
  plugins: [
        // 处理html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        // 独立css文件，首页的
        new ExtractTextPlugin("css/[name].css"),
        // 处理公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        })

  ],
   // webpack-dev server
   // historyApiFallback 404 页面位置
   devServer: {
      port : 8086,
      historyApiFallback : {
          index : '/dist/index.html'
      },

      proxy : {
          '/manage' : {
              target : 'http://adminv2.happymmall.com',
              changeOrigin : true
          },
          '/user' : {
              target : 'http://adminv2.happymmall.com',
              changeOrigin : true
          }
      }
   }

};