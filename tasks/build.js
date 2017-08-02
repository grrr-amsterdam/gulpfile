import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', (done) => runSequence.use(gulp)(
  'init',
  'clean',
  [
    'copy',
    'sass',
    'javascript:build',
    'javascript:vendor',
    'images',
    'icons',
    'modernizr',
  ],
  'eslint',
  'sass:lint',
  'revision',
  done
));

gulp.task('default', ['build']);
