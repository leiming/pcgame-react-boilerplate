// http://stackoverflow.com/questions/28870296/how-to-use-jest-with-webpack
// https://github.com/facebook/jest/issues/334

var babelJest = require('babel-jest');

module.exports = {
  process: function(src, filename) {
    return babelJest.process(src, filename)
      .replace(/require\(\s*(['"])[\w\/\.\-\!]*\.(css|scss|less)(\1)\);?/gm, '');
  }
}