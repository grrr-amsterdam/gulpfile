import { logError } from '../lib/log';

import fs from 'fs';
import es from 'event-stream';
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
 * Javascript bundle with Browserify and Babel transpiler
 */
const bundle = (args, done) => {
  return args.instance.bundle()
    .on('error', err => {
      logError(err);
      done();
    })
    .pipe(source(args.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.get('tasks.javascript.dist')));
};

const getBrowserifyInstance = (args) => {
  const options = { entries: config.get('tasks.javascript.main') };
  const instance = args && args.watch ? watchify(browserify(options)) : browserify(options);
  return instance.transform(babelify, args.config);
};

gulp.task('javascript:build', (done) => {
  const task = this;
  const entries = config.get('tasks.javascript.bundles');
  return es.merge(entries.map(entry => {
    return bundle({
      task: task,
      instance: getBrowserifyInstance({ config: entry.babel }),
      bundle: entry.bundle,
    }, error => process.exit(1));
  }));
});

gulp.task('javascript:watch', (done) => {
  const task = this;
  const entries = config.get('tasks.javascript.bundles').filter(entry => entry.watch);
  return es.merge(entries.map(entry => {
    return bundle({
      task: task,
      instance: getBrowserifyInstance({
        config: entry.babel,
        watch: true,
      }),
      bundle: entry.bundle,
    }, error => done());
  })).on('end', () => {
    browserSync.reload();
    gulp.start('eslint');
  });
});
