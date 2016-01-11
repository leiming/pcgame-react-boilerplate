var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: [
  'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      './src/index'
    ],
    dropdown: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      './examples/Dropdown/index'
    ],
    button: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      './examples/Button/index'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
  },
  resolve: {
    extensions : ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
