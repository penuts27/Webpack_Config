const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // installed via npm
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.[hash].js'
  },
  // 模式
  mode: 'production',
  // loader
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, {
            loader: 'postcss-loader'
          }
        ]
      }, {
        test: /\.png|.gif/,
        type: 'asset/resource'
      }, {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({ filename: 'style.[hash].css' }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './README.md', to: './README.md' }
      ]
    }),
    new webpack.DefinePlugin({
      // Definitions...
      PRODUCTION: JSON.stringify(false)
    }),
    new CompressionPlugin()
  ],
  devtool: 'source-map'
}
