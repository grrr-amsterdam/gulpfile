import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', (done) => runSequence.use(gulp)(
  'init',
  'clean',
  [
    'modernizr',
    'javascript:build',
    'javascript:vendor',
    'sass',
    'copy',
    'images',
    'icons',
  ],
  'eslint',
  'sass:lint',
  'revision',
  done
));

gulp.task('default', ['build']);
