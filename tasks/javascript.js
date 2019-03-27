import config from '../lib/config';
import { isDevelopment } from '../lib/env';

import log from 'fancy-log';
import fs from 'fs';
import merge from 'merge-stream';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import rollup from 'gulp-better-rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { src, dest, task } from 'gulp';

/**
 * Bundle JavaScript with Rollup and transpile with Babel.
 */
const generateBundle = ({ babelConfig, bundleFile }, errorCallback) => {
  return src(config.get('tasks.javascript.main'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(rollup({
      plugins: [
        resolve(),
        commonjs(),
        babel(babelConfig),
        !isDevelopment && terser(),
      ],
      onwarn: (warning, warn) => {
        const ignored = ['THIS_IS_UNDEFINED', 'CIRCULAR_DEPENDENCY'];
        if (ignored.includes(warning.code)) {
          return;
        }
        if (!isDevelopment) {
          errorCallback(warning);
        } else {
          warn(warning);
        }
      },
    }, {
      format: 'iife',
      file: bundleFile,
    }).on('error', errorCallback))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(config.get('tasks.javascript.dist')));
};

const generateBundles = ({ watch }, done) => {
  if (!config.get('tasks.javascript')) {
    log(`Skipping 'javascript:${watch ? 'watch' : 'build'}' task`);
    return done();
  }
  const entries = config.get('tasks.javascript.bundles')
    .filter(entry => watch ? entry.watch : true);

  return merge(entries.map(entry => {
    return generateBundle({
      babelConfig: entry.babel,
      bundleFile: entry.bundle,
    }, error => {
      log.error(error);
      done();
      if (!isDevelopment) {
        process.exit(1);
      }
    });
  })).on('end', () => {
    if (watch) {
      browserSync.reload();
    }
  });
};

export const jsbuild = done => generateBundles({ watch: false }, done);
export const jswatch = done => generateBundles({ watch: true }, done);

task('javascript:build', jsbuild);
task('javascript:watch', jswatch);
