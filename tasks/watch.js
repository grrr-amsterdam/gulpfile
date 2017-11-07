import config from '../lib/config';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

/**
 * Watches for file changes and runs Gulp tasks accordingly
 */
gulp.task('watch', ['watch:init'], (done) => {
  gulp.watch(config.get('tasks.sass.src'), ['sass', 'sass:lint']);
  gulp.watch(config.get('tasks.images.src'), ['images']);
  gulp.watch(config.get('tasks.icons.src'), ['icons']);
  gulp.watch(config.get('tasks.javascript.src'), ['javascript:watch']);
  if (config.has('tasks.watch.files')) {
    gulp.watch(config.get('tasks.watch.files'), browserSync.reload);
  }
  done();
});

gulp.task('watch:init', (done) => runSequence.use(gulp)(
  'init',
  'clean',
  [
    'browsersync',
    'modernizr',
    'javascript:vendor',
    'sass',
    'copy',
    'images',
    'icons',
  ],
  'javascript:build:legacy',
  'javascript:watch',
  'eslint',
  'sass:lint',
  done
));
