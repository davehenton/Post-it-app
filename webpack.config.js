const webpack = require('webpack');
const path = require('path');
require('dotenv').config();
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
  entry: [
    'webpack-hot-middleware/client',
    './client/src/index.jsx'
  ],
  devtool: 'eval',
  output: {
    path: path.join(__dirname, 'client'),
    publicPath: '/',
    filename: 'index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'client'),
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
    new Dotenv({
      path: './.env',
      safe: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.scss?$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};
module.exports = config;
