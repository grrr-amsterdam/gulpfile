import config from '../lib/config';

import gulp from 'gulp';
import pump from 'pump';
import imagemin from 'gulp-imagemin';

/**
 * Compresses images
 */
gulp.task('images', (done) => {
  pump([
    gulp.src(config.get('tasks.images.src')),
    imagemin([
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
        ]
      })
    ]),
    gulp.dest(config.get('tasks.images.dist')),
  ], done);
});
