import { isDevelopment } from '../lib/env';
import { logError } from '../lib/log';
import fs from 'fs';
import config from '../lib/config';
import gulp from 'gulp';
import pump from 'pump';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';

import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';

const hasBabelConfig = fs.existsSync('.babelrc');
let browserifyInstance;

/**
 * Javascript bundle with Browserify
 */
const bundle = (done) => {
  if (!hasBabelConfig) {
    return;
  }
  pump([
    browserifyInstance.bundle(),
    source(config.get('tasks.javascript.bundle')),
    buffer(),
    sourcemaps.init({ loadMaps: true }),
    gulpif(!isDevelopment, uglify({
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: /^!/,
      }
    })),
    sourcemaps.write('./'),
    gulp.dest(config.get('tasks.javascript.dist')),
    browserSync.stream({ once: true }),
  ], done);
};

const initBrowserify = (options) => {
  if (!hasBabelConfig) {
    logError(
      `\n——————————————\n
      Warning: No JavaScript will be built, since there\'s no \`.babelrc\` file present.
      For help, check: https://github.com/grrr-amsterdam/gulpfile#configure
      \n——————————————`
    );
    return;
  }
  const opts = Object.assign({}, watchify.args, {
    entries: config.get('tasks.javascript.main'),
  });
  browserifyInstance = browserify(opts);

  // If this is a watch task, wrap browserify in watchify
  if (options && options.watch) {
    browserifyInstance = watchify(browserifyInstance);
  }

  const babelConfig = JSON.parse(fs.readFileSync('.babelrc'));
  browserifyInstance.transform(babelify, babelConfig).on('error', (err) => {
    logError(err);
  });

  // Run here, since gulp.watch is less reliable
  browserifyInstance.on('update', () => {
    gulp.start('javascript:rebuild');
    gulp.start('eslint');
  });
}

gulp.task('javascript:build', () => {
  initBrowserify();
  return bundle();
});
gulp.task('javascript:watch', () => {
  initBrowserify({ watch: true });
  return bundle();
});
gulp.task('javascript:rebuild', () => {
  return bundle();
});
