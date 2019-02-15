import config from '../lib/config';

import log from 'fancy-log';
import pump from 'pump';
import gulpModernizr from 'gulp-modernizr';
import uglify from 'gulp-uglify';
import { src, dest, task } from 'gulp';

/**
 * Check .js and .scss source files for Modernizr tests and create a custom
 * Modernizr build containing those tests.
 *
 * Note: this task isn't run on watch, you can run it manually via `gulp modernizr`
 */
export const modernizr = done => {
  if (!config.get('tasks.sass.src') && !config.get('tasks.javascript.src')) {
    log(`Skipping 'modernizr' task`);
    return done();
  }
  pump([
    src([
      config.get('tasks.sass.src') || '',
      config.get('tasks.javascript.src') || '',
      '!**/{vendor,polyfills}/**/*.js',
    ]),
    gulpModernizr({
      enableJSClass: false,
      options: [
        'setClasses',
      ],
      tests: [
        'picture',
      ],
    }),
    uglify(),
    dest(config.get('tasks.javascript.dist')),
  ], done);
};

task('modernizr', modernizr);
