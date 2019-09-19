import config from '../lib/config';

import log from 'fancy-log';
import pump from 'pump';
import path from 'path';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import { src, dest, task } from 'gulp';

/**
 * Create an SVG icon sprite.
 */
export const icons = done => {
  if (!config.get('tasks.icons')) {
    log(`Skipping 'icons' task`);
    return done();
  }
  return pump([
    src(config.get('tasks.icons.src')),
    svgmin((file) => ({
      plugins: [{
        cleanupIDs: {
          prefix: path.basename(file.relative, `${path.extname(file.relative)}-`),
          minify: true,
        },
      },
      {
        removeViewBox: false,
      }],
    })),
    svgstore({ inlineSvg: true }),
    dest(config.get('tasks.icons.dist')),
  ], done);
};

task('icons', icons);
