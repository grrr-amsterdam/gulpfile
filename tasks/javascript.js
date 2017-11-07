import { isProduction } from '../lib/env';
import { log, logError } from '../lib/log';
import fs from 'fs';
import config from '../lib/config';
import gulp from 'gulp';
import pump from 'pump';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserSync from 'browser-sync';

import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';

/**
 * Javascript bundle with Browserify
 */
const bundle = (args, done) => {
  pump([
    args.instance.bundle()
      .on('error', err => logError(err)),
    source(args.src),
    buffer(),
    sourcemaps.init({ loadMaps: true }),
    sourcemaps.write('./'),
    gulp.dest(args.dest),
  ], done);
};

const getBrowserifyInstance = (args) => {
  const options = { entries: config.get('tasks.javascript.main') };
  const instance = args && args.watch ? watchify(browserify(options)) : browserify(options);
  instance.transform(babelify, args.config);
  return instance;
};

gulp.task('javascript:build', (done) => {
  bundle({
    instance: getBrowserifyInstance({ config: config.get('tasks.javascript.babel.es6') }),
    src: config.get('tasks.javascript.bundle.es6'),
    dest: config.get('tasks.javascript.dist'),
  }, callback => done());
});

gulp.task('javascript:build:legacy', (done) => {
  bundle({
    instance: getBrowserifyInstance({ config: config.get('tasks.javascript.babel.legacy') }),
    src: config.get('tasks.javascript.bundle.legacy'),
    dest: config.get('tasks.javascript.dist'),
  }, callback => done());
});

/**
 * For the watch and rebuild tasks, we only build/transpile the ES6 file
 */
gulp.task('javascript:watch', (done) => {
  bundle({
    instance: getBrowserifyInstance({
      config: config.get('tasks.javascript.babel.es6'),
      watch: true,
    }),
    src: config.get('tasks.javascript.bundle.es6'),
    dest: config.get('tasks.javascript.dist'),
  }, callback => {
    done();
    browserSync.reload();
    gulp.start('eslint');
  });
});
