import fs from 'fs';
import path from 'path';
import config from '../lib/config';
import gulp from 'gulp';
import pump from 'pump';

import sassLint from 'gulp-sass-lint';

const sassLintConfig = fs.existsSync('.sass-lint.yml') ?
  '.sass-lint.yml' : path.join(__dirname, '../defaults/.sass-lint.yml');

/**
 * Lints sass (see `.sass-lint.yml`)
 */
gulp.task('sass:lint', (done) => {
  pump([
    gulp.src(config.get('tasks.sass.src')).on('finish', () => done()),
    sassLint({
      configFile: sassLintConfig,
    }),
    sassLint.format(),
  ], done);
});
