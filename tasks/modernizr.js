import config from 'config';
import gulp from 'gulp';
import modernizr from 'gulp-modernizr';
import uglify from 'gulp-uglify';

/**
 * Checks js and scss source files for Modernizr tests such as Modernizr.flexbox or .flexbox
 * and creates a custom modernizr build containing only the tests you use.
 *
 * Note: this task isn't run on watch, you can run it manually via `gulp modernizr`
 */
gulp.task('modernizr', () => gulp
  .src([
    config.get('paths.css.src'),
    config.get('paths.js.src'),
  ])
  .pipe(modernizr({
    enableJSClass: false,
    options: [
      'setClasses',
    ],
    tests: [
      'picture',
    ],
  }))
  .pipe(uglify())
  .pipe(gulp.dest(config.get('paths.js.dist')))
);
