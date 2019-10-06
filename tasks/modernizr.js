import config from '../lib/config';

import log from 'fancy-log';
import pump from 'pump';
import gulpModernizr from 'gulp-modernizr';
import terser from 'gulp-terser';
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
  return pump([
    src([
      config.get('tasks.sass.src'),
      config.get('tasks.javascript.src'),
      '!**/{vendor,polyfills}/**/*.js',
    ].filter(entry => entry)),
    gulpModernizr({
      options: [
        'setClasses',
      ],
      ...config.get('tasks.modernizr') || {},
    }),
    terser(),
    dest(config.get('tasks.javascript.dist')),
  ], done);
};

task('modernizr', modernizr);
