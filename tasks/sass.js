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

const CLEAN_CSS_CONFIG = config.get('tasks.sass.cleanCss')
  ? config.get('tasks.sass.cleanCss')
  : {
    compatibility: 'ie11',
    level: 1,
  };

const PROCESSOR_CONFIG = [
  autoprefixer(AUTOPREFIXER_CONFIG),
  pxtorem({
    root_value: 10,
    unit_precision: 5,
    prop_white_list: [
      'font',
      'font-size',
    ],
    replace: false,
    media_query: false,
  }),
];

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
    postcss(PROCESSOR_CONFIG),
    gulpif(!isDevelopment, cleanCSS(CLEAN_CSS_CONFIG)),
    dest(config.get('tasks.sass.dist')),
    browserSync.reload({ stream: true }),
  ], done);
};

task('sass', sass);
