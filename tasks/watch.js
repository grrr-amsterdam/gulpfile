import config from '../lib/config';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

/**
 * Watches for file changes and runs Gulp tasks accordingly
 */
gulp.task('watch', ['watch:init'], () => {
  gulp.watch(config.get('tasks.sass.src'), ['sass', 'sass:lint']);
  gulp.watch(config.get('tasks.images.src'), ['images']);
  gulp.watch(config.get('tasks.icons.src'), ['icons']);
  if (config.has('tasks.watch.files')) {
    gulp.watch(config.get('tasks.watch.files'), browserSync.reload);
  }
});

gulp.task('watch:init', (done) => runSequence.use(gulp)(
  'init',
  'clean',
  [
    'copy',
    'sass',
    'javascript:watch',
    'javascript:vendor',
    'images',
    'icons',
    'modernizr',
    'browsersync',
  ],
  'eslint',
  'sass:lint',
  done
));
