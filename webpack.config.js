const { copyFile } = require('fs')
const { resolve } = require('path')

const WebpackShellPlugin = require('webpack-shell-plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'production',
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
    new WebpackShellPlugin({
      onBuildEnd: 'cp dist/* app/libs/'
    }),
  ]
}
