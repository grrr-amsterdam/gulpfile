import config from '../lib/config';

import log from 'fancy-log';
import gulp from 'gulp';
import pump from 'pump';

gulp.task('copy', (done) => {
  if (!config.get('tasks.copy')) {
    log(`Skipping 'copy' task`);
    return done();
  }
  pump([
    gulp.src(config.get('tasks.copy'), {
      base: config.get('paths.src'),
    }),
    gulp.dest(config.get('paths.dist'))
  ], done);
});
