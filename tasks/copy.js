import config from 'config';
import gulp from 'gulp';
import copy from 'gulp-copy';

gulp.task('copy', () => gulp
  .src(`${config.get('paths.src')}/favicon.ico`)
  .pipe(copy(config.get('paths.dist'), { prefix: 1 }))
);
