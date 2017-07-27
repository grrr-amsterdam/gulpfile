import config from '../lib/config';
import gulp from 'gulp';
import pump from 'pump';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';

/**
 * Copy some JS vendor files (eg. polyfills)
 */
gulp.task('javascript:vendor', (done) => {
  if (!config.has('tasks.javascript:vendor')) {
    return;
  }
  const entries = config.get('tasks.javascript:vendor');
  entries.forEach((entry, index) => {
    pump([
      gulp.src(entry.src),
      // gulpif(entry.bundle, concat(entry.bundle)),
      uglify({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        output: {
          comments: /^!/,
        }
      }),
      gulp.dest(entry.dist),
    ]);
  });
  done();
});
