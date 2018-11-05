const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  context: resolve('src'),
  entry: './index.js',
  output: {
    libraryTarget: 'umd',
    path: resolve('dist'),
    filename: 'we-easy.js',
    sourceMapFilename: 'we-easy.js.map',
  },
  devtool: '#source-map',
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: [
  //         'babel-loader'
  //       ]
  //     }
  //   ]
  // }
}
