import config from 'config';
import gulp from 'gulp';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';
import handleError from '../lib/handleError';

const $ = gulpLoadPlugins();

/**
 * Creates an svg sprite out of all files in the public/css/img/icons folder
 *
 * This sprite is lazy loaded with JS, see load-icons.js for more info
 */
gulp.task('svg', () => gulp
  .src(config.get('paths.svg.src'))
  .pipe($.svgmin((file) => ({
    plugins: [{
      cleanupIDs: {
        prefix: path.basename(file.relative, path.extname(file.relative)) + '-',
        minify: true,
      },
    }],
  })).on('error', handleError))
  .pipe($.svgstore({ inlineSvg: true }).on('error', handleError))
  .pipe(gulp.dest(config.get('paths.svg.dist')))
);
