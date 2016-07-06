import config from 'config';
import gulp from 'gulp';
import util from 'gulp-util';
import { ENV } from '../lib/getEnv';

/**
 * Shows a friendly message and does nothing else
 */
gulp.task('init', () => {
  util.log(util.colors.green('----------------------------------'));
  util.log(util.colors.green(`Environment: ${ENV}`));
  util.log(util.colors.green(''));

  const CDNPath = config.get('cdn.domain') ? config.get('cdn.domain') : '[local]';
  util.log(util.colors.green(`CDN url used in css: ${CDNPath}`));
  util.log(util.colors.green('----------------------------------'));
});
