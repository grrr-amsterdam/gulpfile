import config from 'config';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import handleError from '../lib/handleError';
import { ENV, PROFILE } from '../lib/getEnv';

/**
 * Javascript bundle with Browserify
 */

 let browserifyInstance;

const bundle = () => browserifyInstance.bundle()
  .on('error', handleError)
  .pipe(source(config.get('paths.js.bundle')))
  .pipe(buffer())
  .pipe(gulpIf(ENV === 'development' && PROFILE !== 'production',
    sourcemaps.init({ loadMaps: true })
  ))
  .pipe(gulpIf(ENV !== 'development' || PROFILE === 'production',
    uglify()
  ))
  .on('error', handleError)
  .pipe(gulpIf(ENV === 'development' && PROFILE !== 'production',
    sourcemaps.write({ loadMaps: true })
  ))
  .pipe(gulp.dest(config.get('paths.js.dist')))
  .pipe(browserSync.stream({ once: true }))
;

function initBrowserify(options) {
  const customOpts = {
    entries: config.get('paths.js.entries'),
  };
  const opts = Object.assign({}, watchify.args, customOpts);
  browserifyInstance = browserify(opts);

  // If this is a watch task, wrap browserify in watchify
  if (options && options.watched) {
    browserifyInstance = watchify(browserifyInstance);
  }
  browserifyInstance.transform(babelify, {
    presets: ['es2015'],
  }).on('error', handleError);

  browserifyInstance.on('update', () => bundle(browserifyInstance));
  return bundle(browserifyInstance);
}

gulp.task('browserify', initBrowserify);
gulp.task('browserify:watched', () => initBrowserify({ watched: true }));
gulp.task('browserify:bundle', bundle);
