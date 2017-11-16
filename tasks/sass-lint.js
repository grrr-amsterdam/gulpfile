import config from '../lib/config';
import { isDevelopment } from '../lib/env';
import { log } from '../lib/log';
import fs from 'fs';
import path from 'path';
import gulp from 'gulp';

import sassLint from 'gulp-sass-lint';

const sassLintConfig = fs.existsSync('.sass-lint.yml') ?
  '.sass-lint.yml' : path.join(__dirname, '../defaults/.sass-lint.yml');

/**
 * Lints sass (see `.sass-lint.yml`)
 */
gulp.task('sass:lint', () => {
  if (!isDevelopment) {
    log('sass-lint: skipping for non-development');
    return;
  }
  return gulp.src(config.get('tasks.sass.src'))
    .pipe(sassLint({
      configFile: sassLintConfig,
    }))
    .pipe(sassLint.format());
});
