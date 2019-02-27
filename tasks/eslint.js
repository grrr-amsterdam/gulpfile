import config from '../lib/config';
import { isDevelopment } from '../lib/env';

import log from 'fancy-log';
import fs from 'fs';
import path from 'path';
import gulpEsLint from 'gulp-eslint';
import { src, dest, task } from 'gulp';

const ESLINT_CONFIG = fs.existsSync('.eslintrc')
  ? '.eslintrc'
  : path.join(__dirname, '../defaults/.eslintrc');

/**
 * Lint JavaScript files (see `.eslintrc`).
 */
export const eslint = done => {
  if (!config.get('tasks.javascript.src')) {
    log(`skipping 'eslint' task`);
    return done();
  }
  return src([
    config.get('tasks.javascript.src'),
    '!**/{vendor,polyfills}/**/*.js',
  ])
    .pipe(gulpEsLint(ESLINT_CONFIG))
    .pipe(gulpEsLint.format())
    .pipe(gulpEsLint.results(results => {
      // See https://github.com/adametry/gulp-eslint/issues/135
      if (!isDevelopment && results.errorCount > 0) {
        done();
        process.exit(1);
      }
    }));
};

task('eslint', eslint);
