import gulp from 'gulp';
import util from 'gulp-util';
import { ENV } from '../lib/getEnv';

/**
 * Shows a friendly message and does nothing else
 */
gulp.task('init', () => {
  util.log(util.colors.green('----------------------------------'));
  util.log(util.colors.green(`Environment: ${ENV}`));
  util.log(util.colors.green('----------------------------------'));
});
