var path = require('path');
var fs = require('fs');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/example/:component', function (req, res) {
  var componentDir = path.join(__dirname, 'examples', req.params.component)
  try {
    if (fs.statSync(componentDir).isDirectory()) {
      res.sendFile(path.join(__dirname, 'examples', req.params.component, 'index.html'));
    }
  }
  catch (err) {
    res.send(req.params.component + " is not exist!");
  }
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
