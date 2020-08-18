import config from '../lib/config';
import { isDevelopment } from '../lib/env';

import log from 'fancy-log';
import pump from 'pump';
import gulpif from 'gulp-if';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sassGlob from 'gulp-sass-glob';
import cleanCSS from 'gulp-clean-css';
import pxtorem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import { src, dest, task } from 'gulp';

const AUTOPREFIXER_CONFIG = config.get('tasks.sass.autoprefixer');

const PXTOREM_CONFIG = {
  rootValue: 10,
  selectorBlackList: [
    ':root',
  ],
  ...config.get('tasks.sass.pxtorem'),
};

const CLEANCSS_CONFIG = {
  compatibility: 'ie11',
  level: 1,
  ...config.get('tasks.sass.cleanCss'),
};

/**
 * Compile Sass files.
 */
export const sass = done => {
  if (!config.get('tasks.sass')) {
    log(`Skipping 'sass' task`);
    return done();
  }
  return pump([
    src(config.get('tasks.sass.main')),
    sassGlob(),
    gulpSass().on('error', error => {
      if (!isDevelopment) {
        log.error(error);
        done();
        process.exit(1);
      }
    }),
    postcss([
      autoprefixer(AUTOPREFIXER_CONFIG),
      pxtorem(PXTOREM_CONFIG),
    ]),
    gulpif(!isDevelopment, cleanCSS(CLEANCSS_CONFIG)),
    dest(config.get('tasks.sass.dist')),
    browserSync.reload({ stream: true }),
  ], done);
};

task('sass', sass);
