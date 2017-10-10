import { isProduction } from '../lib/env';
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

import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';

let browserifyInstance;

/**
 * Javascript bundle with Browserify
 */
const bundle = (bundleFile, done) => {
  pump([
    browserifyInstance.bundle()
      .on('error', err => logError(err)),
    source(bundleFile),
    buffer(),
    sourcemaps.init({ loadMaps: true }),
    sourcemaps.write('./'),
    gulp.dest(config.get('tasks.javascript.dist')),
    browserSync.stream({ once: true }),
  ], done);
};

const initBrowserify = (args) => {
  const options = { entries: config.get('tasks.javascript.main') };
  browserifyInstance = args && args.watch ? watchify(browserify(options)) : browserify(options);
  browserifyInstance.transform(babelify, args.config);
  browserifyInstance.on('update', () => gulp.start('javascript:rebuild'));
}

gulp.task('javascript:build', (done) => {
  initBrowserify({ config: config.get('tasks.javascript.babel.es6') });
  bundle(config.get('tasks.javascript.bundle.es6'), callback => done());
});

gulp.task('javascript:build:legacy', (done) => {
  initBrowserify({ config: config.get('tasks.javascript.babel.legacy') });
  bundle(config.get('tasks.javascript.bundle.legacy'), callback => done());
});

/**
 * For the watch and rebuild tasks, we only build/transpile the ES6 file
 */
gulp.task('javascript:watch', (done) => {
  initBrowserify({
    config: config.get('tasks.javascript.babel.es6'),
    watch: true,
  });
  bundle(config.get('tasks.javascript.bundle.es6'), callback => done());
});

gulp.task('javascript:rebuild', (done) => {
  bundle(config.get('tasks.javascript.bundle.es6'), callback => {
    done();
    gulp.start('eslint');
  });
});
