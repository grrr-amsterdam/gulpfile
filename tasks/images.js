import config from '../lib/config';

import log from 'fancy-log';
import pump from 'pump';
import imagemin from 'gulp-imagemin';
import { src, dest, task } from 'gulp';

/**
 * Compress images.
 */
export const images = done => {
  if (!config.get('tasks.images')) {
    log(`Skipping 'images' task`);
    return done();
  }
  return pump([
    src(config.get('tasks.images.src')),
    imagemin([
      imagemin.mozjpeg({
        progressive: true,
      }),
      imagemin.svgo({
        plugins: [
          {
            removeViewBox: false,
          },
        ],
      }),
    ]),
    dest(config.get('tasks.images.dist')),
  ], done);
};

task('images', images);
