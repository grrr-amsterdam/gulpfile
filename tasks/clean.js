import config from '../lib/config';

import gulp from 'gulp';
import del from 'del';

/**
 * Deletes all previous build files
 */
gulp.task('clean', () => del([
  `${config.get('paths.dist')}/**/*`,
], { dot: true }));
