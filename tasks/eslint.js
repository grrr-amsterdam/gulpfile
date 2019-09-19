import config from '../lib/config';

import log from 'fancy-log';
import fs from 'fs';
import path from 'path';
import gulpEsLint from 'gulp-eslint';
import { src, task } from 'gulp';

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
    .pipe(gulpEsLint.format());
};

task('eslint', eslint);
