require('@babel/register')({
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
  ],
  only: [/(grrr-gulpfile|gulpfile)\/(gulpfile\.babel\.js|tasks|lib)/],
  extensions: ['.js'],
});
require('./gulpfile.babel.js');
