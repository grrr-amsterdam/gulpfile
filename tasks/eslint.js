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
gulp.task('eslint', () => {
  if (!isDevelopment) {
    log('eslint: skipping for non-development');
    return;
  }
  return gulp.src([
    config.get('tasks.javascript.src'),
    '!**/{vendor,polyfills}/**/*.js',
  ])
    .pipe(eslint(eslintConfig))
    .pipe(eslint.formatEach());
});
