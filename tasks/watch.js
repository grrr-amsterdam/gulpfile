import config from 'config';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

/**
 * Watches for file changes and runs Gulp tasks accordingly
 */
gulp.task('watch', ['watch:init'], () => {
  gulp.watch(config.get('paths.css.src'), ['sass', 'sass:lint']);
  gulp.watch(config.get('paths.svg.src'), ['svg']);
  gulp.watch(config.get('paths.js.src'), ['browserify:bundle']);
  gulp.watch(config.get('paths.images.src'), ['images']);
  gulp.watch('views/**/*.*', browserSync.reload);
});

gulp.task('watch:init', (done) => runSequence.use(gulp)(
  'init',
  'clean',
  [
    'copy',
    'sass',
    'sass:lint',
    'browserify:watched',
    'images',
    'svg',
    'modernizr',
  ],
  'browser-sync',
  done
));
