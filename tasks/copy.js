import config from '../lib/config';

import log from 'fancy-log';
import gulp from 'gulp';
import pump from 'pump';
import copy from 'gulp-copy';

gulp.task('copy', (done) => {
  if (!config.get('tasks.copy')) {
    log(`Skipping 'copy' task`);
    return done();
  }
  pump([
    gulp.src(config.get('tasks.copy')),
    copy(config.get('paths.dist'), { prefix: 1 }),
    gulp.dest(config.get('paths.dist'))
  ], done);
});
