import config from '../lib/config';

import log from 'fancy-log';
import gulp from 'gulp';
import merge from 'merge-stream';
import pump from 'pump';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';

/**
 * Copy some JS vendor files (eg. polyfills)
 */
gulp.task('javascript:vendor', (done) => {
  if (!config.get('tasks.javascript:vendor')) {
    log(`Skipping 'javascript:vendor' task`);
    return done();
  }
  const entries = config.get('tasks.javascript:vendor');
  return merge(entries.map(entry => {
    /**
     * Somehow gulpif and concat don't play nice at all, so we use this
     * ugly if/else-statement for now ¯\_(ツ)_/¯
     */
    if (entry.bundle) {
      return gulp.src(entry.src)
        .pipe(concat(entry.bundle))
        .pipe(uglify({
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          output: {
            comments: /^!/,
          }
        }))
        .pipe(gulp.dest(entry.dist));
    } else {
      return gulp.src(entry.src)
        .pipe(uglify({
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          output: {
            comments: /^!/,
          }
        }))
        .pipe(gulp.dest(entry.dist));
    }
  }));
});
