import { log } from './../lib/log';
import { env } from '../lib/env';
import gulp from 'gulp';

/**
 * Shows a friendly message and does nothing else
 */
gulp.task('init', () => {
  log('----------------------------------');
  log(`Environment: ${env}`);
  log('----------------------------------');
});
