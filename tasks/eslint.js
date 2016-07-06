import config from 'config';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import handleError from '../lib/handleError';
/**
 * Lints JS
 */
gulp.task('eslint', () => gulp
  .src(config.get('paths.js.src'))
  .pipe(eslint('.eslintrc.json').on('error', handleError))
  .pipe(eslint.format())
);
