var path = require('path');
var webpack = require('webpack');

// For example
const componentList = ['dropdown', 'button', 'tooltip'];

var compenentEntry = {
  index: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ]
};

componentList.map((value) => {
  compenentEntry[value] = [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './examples/' + value + '/index']
})

module.exports = {
  devtool  : 'cheap-module-eval-source-map',
  entry    : compenentEntry,
  output   : {
    path      : path.join(__dirname, 'build'),
    filename  : '[name].js',
    publicPath: '/static/'
  },
  plugins  : [
    new webpack.DefinePlugin({__DEV__: true, __PRODUCTION__: false}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
  },
  resolve  : {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module   : {
    loaders: [
      {
        test   : /\.(jsx|js)?/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'examples')]
      },

      {
        test  : /\.less$/,
        loader: "style!css!postcss-loader!less"
      },

      {
        test  : /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss  : function (webpack) {
    return [
      require("postcss-import")({addDependencyTo: webpack}),
      require("postcss-url")(),
      require("postcss-cssnext")({browsers: ["last 2 versions", "ie >= 8" , "> 1%"]}),
      // and if you want to compress,
      // just use css-loader option that already use cssnano under the hood
      require("postcss-browser-reporter")(),
      require("postcss-reporter")()
    ]
  }
};
