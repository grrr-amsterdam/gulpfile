require('babel-register')({
  plugins: [
    'transform-es2015-modules-commonjs',
  ],
  only: /(grrr-gulpfile|gulpfile)\/(gulpfile\.babel\.js|tasks|lib)/,
  extensions: ['.js'],
});
require('./gulpfile.babel.js');
