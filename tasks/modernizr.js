import config from '../lib/config';
import gulp from 'gulp';
import pump from 'pump';

import modernizr from 'gulp-modernizr';
import uglify from 'gulp-uglify';

/**
 * Checks js and scss source files for Modernizr tests such as Modernizr.flexbox or .flexbox
 * and creates a custom modernizr build containing only the tests you use.
 *
 * Note: this task isn't run on watch, you can run it manually via `gulp modernizr`
 */
gulp.task('modernizr', (done) => {
  pump([
    gulp.src([
      config.get('tasks.sass.src'),
      config.get('tasks.javascript.src'),
      '!**/{vendor,polyfills}/**/*.js',
    ]),
    modernizr({
      enableJSClass: false,
      options: [
        'setClasses',
      ],
      tests: [
        'picture',
      ],
    }),
    uglify(),
    gulp.dest(config.get('tasks.javascript.dist')),
  ], done);
});
