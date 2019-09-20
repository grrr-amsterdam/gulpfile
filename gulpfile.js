require('@babel/register')({
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-modules-commonjs',
  ],
  only: [
    /(@grrr\/gulpfile|gulpfile)\/(gulpfile\.babel\.js|tasks|lib)/,
    /(@grrr\/utils)/,
  ],
  extensions: ['.js', '.mjs'],
});
require('./gulpfile.babel.js');
