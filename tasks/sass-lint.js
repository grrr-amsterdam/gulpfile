import config from '../lib/config';
import { isDevelopment } from '../lib/env';

import log from 'fancy-log';
import fs from 'fs';
import path from 'path';
import gulpSassLint from 'gulp-sass-lint';
import { src, dest, task } from 'gulp';

const LINT_CONFIG = fs.existsSync('.sass-lint.yml')
  ? '.sass-lint.yml'
  : path.join(__dirname, '../defaults/.sass-lint.yml');

/**
 * Lints sass (see `.sass-lint.yml`)
 */
export const sasslint = done => {
  if (!config.get('tasks.sass')) {
    log(`Skipping 'sass:lint' task`);
    return done();
  }
  if (!isDevelopment) {
    log(`Skipping 'sass-lint' task for non-development`);
    return done();
  }
  return src(config.get('tasks.sass.src'))
    .pipe(gulpSassLint({
      configFile: LINT_CONFIG,
    }))
    .pipe(gulpSassLint.format());
};

task('sass:lint', sasslint);
