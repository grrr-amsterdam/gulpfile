import config from '../lib/config';

import log from 'fancy-log';
import gulp from 'gulp';
import pump from 'pump';
import path from 'path';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';

/**
 * Creates an svg icon sprite
 */
gulp.task('icons', (done) => {
  if (!config.get('tasks.icons')) {
    log(`Skipping 'icons' task`);
    return done();
  }
  pump([
    gulp.src(config.get('tasks.icons.src')),
    svgmin((file) => ({
      plugins: [{
        cleanupIDs: {
          prefix: path.basename(file.relative, path.extname(file.relative)) + '-',
          minify: true,
        },
      }],
    })),
    svgstore({ inlineSvg: true }),
    gulp.dest(config.get('tasks.icons.dist')),
  ], done);
});
