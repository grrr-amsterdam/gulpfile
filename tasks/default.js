import gulp from 'gulp';
import util from 'gulp-util';
import runSequence from 'run-sequence';


gulp.task('build', (done) => {
  runSequence.use(gulp)(
    'init',
    'clean',
    [
      'copy',
      'sass',
      'sass:lint',
      'browserify',
      'images',
      'svg',
      'modernizr',
    ],
    'revision',
    done
  );
});

gulp.task('default', ['build']);
