const webpack = require('webpack')
const path = require('path')
const config = require('./config')

const srcPath = path.resolve(__dirname, '../src')
const outPath = path.resolve(__dirname, '../dist')

const plugins = [
  new webpack.DefinePlugin(config.replace),
]

module.exports = {
  entry: {
    bundle: config.input,
  },
  devtool: '#source-map',
  output: {
    filename: '[name].js',
    path: outPath,
    publicPath: '/',
  },
  resolve: {
    modules: [
      srcPath,
      path.join(__dirname, '../node_modules'),
    ],
    extensions: ['.jsx', '.js', '.json', '.scss'],
    alias: {
      '@': srcPath,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          srcPath,
          path.join(__dirname, '../test'),
        ],
      }, {
        test: /\.json$/i,
        loader: 'json-loader',
      }, {
        test: /\.txt$/i,
        loader: 'raw-loader',
      },
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [
                srcPath,
                path.resolve(__dirname, '../node_modules'),
              ],
            },
          },
        ],
      },
    ],
    noParse: [/openlayers/],
  },
  plugins,
}
