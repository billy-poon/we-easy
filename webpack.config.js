const { resolve } = require('path')

const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
  plugins: [
    new CopyWebpackPlugin([{
      from: resolve('dist'),
      to: resolve('app/libs'),
    }]),
  ]
}
