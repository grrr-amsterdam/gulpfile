require('babel-register')({
  only: /(grrr-gulpfile|gulpfile)\/(gulpfile\.babel\.js|tasks|lib)/,
  extensions: ['.js'],
});
require('./gulpfile.babel.js');
