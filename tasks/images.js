import config from 'config';
import gulp from 'gulp';
import util from 'gulp-util';
import imagemin from 'gulp-imagemin';
import handleError from '../lib/handleError';

/**
 * Compresses images
 */
gulp.task('images', () => {
  util.log(util.colors.green(`Building images to ${config.get('paths.images.dist')}`));
  return gulp.src(config.get('paths.images.src'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
    }))
    .on('error', handleError)
    .pipe(gulp.dest(config.get('paths.images.dist')))
  ;
});
