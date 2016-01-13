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
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)?/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'examples')]
      },

      {
        test: /\.less$/,
        loader: "style!css!less"
      },

      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function (webpack) {
    return [
      require("postcss-import")({addDependencyTo: webpack}),
      require("postcss-url")(),
      require("postcss-cssnext")(),
      // and if you want to compress,
      // just use css-loader option that already use cssnano under the hood
      require("postcss-browser-reporter")(),
      require("postcss-reporter")()
    ]
  }
};
