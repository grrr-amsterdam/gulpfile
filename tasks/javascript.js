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
import { dest, task } from 'gulp';

const closureCompiler = require('google-closure-compiler').gulp();

/**
 * Bundle JavaScript with Browserify and transpile with Babel.
 */
const generateBundle = ({ instance, bundle, minify }, done) => {
  const runClosureCompiler = minify && !isDevelopment;
  return instance.bundle()
    .on('error', err => {
      log.error(err);
      done();
    })
    // Note: the Closure Compiler does not like the input name to be the
    // same as the output name, so we fake a name here when it needs to run.
    .pipe(source(runClosureCompiler ? 'random.js' : bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(runClosureCompiler,
      closureCompiler({
        compilation_level: 'SIMPLE_OPTIMIZATIONS',
        warning_level: 'QUIET',
        language_in: 'ECMASCRIPT6_STRICT',
        language_out: 'ECMASCRIPT5_STRICT',
        output_wrapper: '(function(){\n%output%\n}).call(this)',
        js_output_file: bundle,
      }, {
        platform: ['native', 'java', 'javascript']
      }).on('error', error => {
        log.error(error);
        if (!isDevelopment) {
          process.exit(1);
        }
      }))
    )
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
      minify: entry.minify,
    }, error => process.exit(1));
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
      minify: entry.minify,
    }, error => done());
  })).on('end', () => {
    browserSync.reload();
    eslint();
  });
};

task('javascript:build', jsbuild);
task('javascript:watch', jswatch);
