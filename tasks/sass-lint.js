import config from '../lib/config';
import { isDevelopment } from '../lib/env';

import log from 'fancy-log';
import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import sassLint from 'gulp-sass-lint';

const sassLintConfig = fs.existsSync('.sass-lint.yml')
  ? '.sass-lint.yml'
  : path.join(__dirname, '../defaults/.sass-lint.yml');

/**
 * Lints sass (see `.sass-lint.yml`)
 */
gulp.task('sass:lint', (done) => {
  if (!config.get('tasks.sass')) {
    log(`Skipping 'sass:lint' task`);
    return done();
  }
  if (!isDevelopment) {
    log(`Skipping 'sass-lint' task for non-development`);
    return done();
  }
  return gulp.src(config.get('tasks.sass.src'))
    .pipe(sassLint({
      configFile: sassLintConfig,
    }))
    .pipe(sassLint.format());
});
