import config from '../lib/config';
import gulp from 'gulp';
import pump from 'pump';

import copy from 'gulp-copy';

gulp.task('copy', (done) => {
  if (!config.has('tasks.copy')) {
    return;
  }
  pump([
    gulp.src(config.get('tasks.copy')),
    copy(config.get('paths.dist'), { prefix: 1 }),
  ], done);
});
