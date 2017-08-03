import { isDevelopment } from '../lib/env';
import { log, logError } from '../lib/log';
import fs from 'fs';
import config from '../lib/config';
import gulp from 'gulp';
import pump from 'pump';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

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
    browserifyInstance.bundle()
      .on('error', err => logError(err))
      .on('end', () => done()),
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
  ]);
};

const initBrowserify = (args) => {
  if (!hasBabelConfig) {
    return logError(
      `\n——————————————\n
      Warning: No JavaScript will be built, since there\'s no \`.babelrc\` file present.
      For help, check: https://github.com/grrr-amsterdam/gulpfile#configure
      \n——————————————`
    );
  }
  const babelConfig = JSON.parse(fs.readFileSync('.babelrc'));
  const options = { entries: config.get('tasks.javascript.main') };
  browserifyInstance = args && args.watch ? watchify(browserify(options)) : browserify(options);
  browserifyInstance.transform(babelify, babelConfig);
  browserifyInstance.on('update', () => {
    gulp.start('javascript:rebuild');
  });
}

gulp.task('javascript:build', (done) => {
  initBrowserify();
  bundle(callback => done());
});
gulp.task('javascript:watch', (done) => {
  initBrowserify({ watch: true });
  bundle(callback => done());
});
gulp.task('javascript:rebuild', (done) => {
  bundle(callback => {
    done();
    gulp.start('eslint');
  });
});