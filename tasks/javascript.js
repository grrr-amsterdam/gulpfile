import config from '../lib/config';
import { isDevelopment } from '../lib/env';

import log from 'fancy-log';
import fs from 'fs';
import merge from 'merge-stream';
import pump from 'pump';
import gulpif from 'gulp-if';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import esmify from 'esmify';
import uglify from 'gulp-uglify';
import { dest, task } from 'gulp';

import { eslint } from './eslint';

/**
 * Bundle JavaScript with Browserify and transpile with Babel.
 */
const generateBundle = ({ instance, bundle }, errorCallback) => {
  return instance.bundle()
    .on('error', errorCallback)
    .pipe(source(bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(!isDevelopment,
      uglify({
        compress: {
          drop_debugger: true,
        },
        output: {
          comments: /^!/,
        }
      }).on('error', errorCallback)
    ))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(config.get('tasks.javascript.dist')));
};

const getBrowserifyInstance = ({ babelConfig, babelifyConfig, watch }) => {
  const options = {
    entries: config.get('tasks.javascript.main'),
    plugin: [
      [ esmify ],
    ],
    ignoreMissing: true,
  };
  const instance = watch ? watchify(browserify(options)) : browserify(options);
  return instance.transform(babelify, { ...babelConfig, ...babelifyConfig });
};

export const jsbuild = done => {
  if (!config.get('tasks.javascript')) {
    log(`Skipping 'javascript:build' task`);
    return done();
  }
  const entries = config.get('tasks.javascript.bundles');
  return merge(entries.map(entry => {
    return generateBundle({
      instance: getBrowserifyInstance({
        babelConfig: entry.babel,
        babelifyConfig: entry.babelify,
      }),
      bundle: entry.bundle,
    }, error => {
      log.error(error);
      done();
      if (!isDevelopment) {
        process.exit(1);
      }
    });
  }));
};

export const jswatch = done => {
  if (!config.get('tasks.javascript')) {
    log(`Skipping 'javascript:watch' task`);
    return done();
  }
  const entries = config.get('tasks.javascript.bundles').filter(entry => entry.watch);
  return merge(entries.map(entry => {
    return generateBundle({
      instance: getBrowserifyInstance({
        babelConfig: entry.babel,
        babelifyConfig: entry.babelify,
        watch: true,
      }),
      bundle: entry.bundle,
    }, error => {
      log.error(error);
      done();
    });
  })).on('end', () => {
    browserSync.reload();
    eslint();
  });
};

task('javascript:build', jsbuild);
task('javascript:watch', jswatch);
