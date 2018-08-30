import config from '../lib/config';

import log from 'fancy-log';
import gulp from 'gulp';
import pump from 'pump';
import imagemin from 'gulp-imagemin';

/**
 * Compresses images
 */
gulp.task('images', (done) => {
  if (!config.get('tasks.images')) {
    log(`Skipping 'images' task`);
    return done();
  }
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
