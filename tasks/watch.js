import config from '../lib/config';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

/**
 * Watches for file changes and runs Gulp tasks accordingly
 */
gulp.task('watch', ['browsersync', 'build'], () => {
  gulp.watch(config.get('tasks.sass.src'), ['sass', 'sass:lint']);
  gulp.watch(config.get('tasks.images.src'), ['images']);
  gulp.watch(config.get('tasks.icons.src'), ['icons']);
  gulp.watch(config.get('tasks.javascript.src'), ['javascript:watch']);
  if (config.has('tasks.watch.files')) {
    gulp.watch(config.get('tasks.watch.files'), browserSync.reload);
  }
});
