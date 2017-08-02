import config from '../lib/config';
import { isDevelopment } from '../lib/env';
import { log } from '../lib/log';
import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import pump from 'pump';

import eslint from 'gulp-eslint';

const eslintConfig = fs.existsSync('.eslintrc') ?
  '.eslintrc' : path.join(__dirname, '../defaults/.eslintrc');

/**
 * Lints JS (see `.eslintrc`)
 */
gulp.task('eslint', (done) => {
  if (!isDevelopment) {
    log('eslint: skipping for non-development');
    return done();
  }
  pump([
    gulp.src([
      config.get('tasks.javascript.src'),
      '!**/{vendor,polyfills}/**/*.js',
    ]).on('finish', () => done()),
    eslint(eslintConfig),
    eslint.formatEach(),
  ], done);
});
