import config from '../lib/config';
import { isDevelopment } from '../lib/env';

import log from 'fancy-log';
import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import eslint from 'gulp-eslint';

const eslintConfig = fs.existsSync('.eslintrc') ?
  '.eslintrc' : path.join(__dirname, '../defaults/.eslintrc');

/**
 * Lints JS (see `.eslintrc`)
 */
gulp.task('eslint', (done) => {
  if (!config.get('tasks.javascript.src')) {
    log(`skipping 'eslint' task`);
    return done();
  }
  return gulp.src([
    config.get('tasks.javascript.src'),
    '!**/{vendor,polyfills}/**/*.js',
  ])
    .pipe(eslint(eslintConfig))
    .pipe(eslint.formatEach())
    .pipe(eslint.results(results => {
      // See https://github.com/adametry/gulp-eslint/issues/135
      if (!isDevelopment && results.errorCount > 0) {
        process.exit(1);
      }
    }));
});
