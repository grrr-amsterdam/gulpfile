import config from '../lib/config';
import { isDevelopment } from '../lib/env';

import log from 'fancy-log';
import fs from 'fs';
import path from 'path';
import gulpStyleLint from 'gulp-stylelint';
import { src, task } from 'gulp';

const LINT_CONFIG = fs.existsSync('.stylelintrc')
  ? '.stylelintrc'
  : path.join(__dirname, '../defaults/.stylelintrc');

/**
 * Lints sass (see `.stylelintrc`)
 */
export const styleLint = done => {
  if (!config.get('tasks.sass')) {
    log(`Skipping 'style:lint' task`);
    return done();
  }
  if (!isDevelopment) {
    log(`Skipping 'style:lint' task for non-development`);
    return done();
  }
  return src(config.get('tasks.sass.src'))
    .pipe(gulpStyleLint({
      configFile: LINT_CONFIG,
      reporters: [
        {
          formatter: 'verbose',
          console: true,
        },
      ],
    }))
    .pipe(gulpStyleLint.format());
};

task('style:lint', styleLint);
