var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    index: [
      'webpack-hot-middleware/client',
      './src/index'
    ],
    dropdown: [
      'webpack-hot-middleware/client',
      './examples/Dropdown/index'
    ],
    button: [
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
    loaders: [
      // JavaScript
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'examples')]
      },
      // LESS
      {
        test: /\.less$/,
        loader: 'style!css!autoprefixer-loader?{browsers:["last 2 versions", "ie 8", "ie 9", "> 1%"]}!less'
      },

      // CSS
      {
        test: /\.css$/,
        loader: 'style!css!autoprefixer-loader?{browsers:["last 2 versions", "ie 8", "ie 9", "> 1%"]}'
      }
    ]

  }
};
