import gulp from 'gulp';
import util from 'gulp-util';
import runSequence from 'run-sequence';
import { ENV } from '../lib/getEnv';

gulp.task('default', [
  'init',
  'clean',
  'copy',
  'sass',
  'sass:lint',
  'browserify',
  'images',
  'svg',
  'modernizr',
], (callback) => {
  if (ENV === 'development') {
    util.log('Skipping revisioning for development');
    return callback();
  }
  return runSequence('revision', callback);
});
