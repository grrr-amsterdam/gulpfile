import config from '../lib/config';
import gulp from 'gulp';
import pump from 'pump';
import util from 'gulp-util';

import imagemin from 'gulp-imagemin';

/**
 * Compresses images
 */
gulp.task('images', (done) => {
  pump([
    gulp.src([
      config.get('tasks.images.src'),
      '!**/icons/**/*.svg',
    ]),
    imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
    }),
    gulp.dest(config.get('tasks.images.dist')),
  ], done);
});
