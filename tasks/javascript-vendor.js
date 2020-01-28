import config from '../lib/config';

import log from 'fancy-log';
import merge from 'merge-stream';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import { src, dest, task } from 'gulp';

export const TERSER_CONFIG = {
  compress: {
    drop_console: true,
  },
  output: {
    comments: false,
  },
};

/**
 * Copy and bundle JavaScript vendor files (eg. polyfills).
 */
export const jsvendor = done => {
  if (!config.get('tasks.javascript:vendor')) {
    log(`Skipping 'javascript:vendor' task`);
    return done();
  }
  const entries = config.get('tasks.javascript:vendor');
  return merge(entries.map(entry => {
    /**
     * Somehow gulpif and concat don't play nice at all, so we use this
     * ugly if/else-statement for now ¯\_(ツ)_/¯
     */
    if (entry.bundle) {
      return src(entry.src)
        .pipe(concat(entry.bundle))
        .pipe(terser(TERSER_CONFIG))
        .pipe(dest(entry.dist));
    }
    return src(entry.src)
      .pipe(terser(TERSER_CONFIG))
      .pipe(dest(entry.dist));
  }));
};

task('javascript:vendor', jsvendor);
