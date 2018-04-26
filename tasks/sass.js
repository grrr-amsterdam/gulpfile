import config from '../lib/config';
import { isDevelopment } from '../lib/env';

import log from 'fancy-log';
import gulp from 'gulp';
import pump from 'pump';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sassGlob from 'gulp-sass-glob';
import cleanCSS from 'gulp-clean-css';
import pxtorem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';

const autoprefixerConfig = config.get('tasks.sass.autoprefixer') ?
  config.get('tasks.sass.autoprefixer') : {
  browsers: [
    "> 0.25%",
    "ie >= 9"
  ]}
;

const cleanCssConfig = config.get('tasks.sass.cleanCss') ?
  config.get('tasks.sass.cleanCss') : {
    compatibility: 'ie8',
    level: 1,
  }
;

const processorsConfig = [
  autoprefixer(autoprefixerConfig),
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
 * Builds css files
 */
gulp.task('sass', (done) => {
  pump([
    gulp.src(config.get('tasks.sass.main')),
    sassGlob(),
    sass().on('error', error => {
      if (!isDevelopment) {
        logError(error);
        process.exit(1);
      }
    }),
    postcss(processorsConfig),
    gulpif(!isDevelopment, cleanCSS(cleanCssConfig)),
    gulp.dest(config.get('tasks.sass.dist')),
    browserSync.reload({ stream: true }),
  ], done);
});
