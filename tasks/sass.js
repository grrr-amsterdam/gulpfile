import browserSync from 'browser-sync';
import config from 'config';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import sass from 'gulp-sass';
import csso from 'gulp-csso';
import postcss from 'gulp-postcss';
import rework from 'gulp-rework';
import scssLint from 'gulp-scss-lint';
import pxtorem from 'postcss-pxtorem';
import util from 'gulp-util';
import autoprefixer from 'autoprefixer';
import reworkUrl from 'rework-plugin-url';
import { ENV, PROFILE } from '../lib/getEnv';
import handleError from '../lib/handleError';

/**
 * Builds css files
 */
gulp.task('sass', () => {
  const processors = [
    autoprefixer({
      browsers: ['>5%', 'last 2 versions', 'ie 9', 'ie 10'],
    }),
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

  return gulp.src(config.get('paths.css.entry'))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulpIf(ENV !== 'development' || PROFILE === 'production', csso()))
    .pipe(gulpIf(ENV !== 'development' && config.get('cdn.domain') !== '', rework(
      reworkUrl((url) => `${config.get('cdn.domain')}/${url}`)
    )))
    .pipe(gulp.dest(config.get('paths.css.dist')))
    .pipe(browserSync.reload({ stream: true }));
});

const scssLintOutputReporter = (file) => {
  if (file.scsslint.success) {
    return;
  }
  util.log(util.colors.gray('-----------------'));
  util.log(`${util.colors.green(file.scsslint.issues.length)} scss-lint issue(s) found:`);
  file.scsslint.issues.forEach((issue) => {
    util.colors.underline(file.path);
    const location = `${util.colors.underline(file.path)}:${issue.line}`;
    util.log(`${util.colors.green(issue.reason)} => ${location}`);
  });
  util.log(util.colors.gray('-----------------'));
};

/**
 * Lints Sass
 */
gulp.task('sass:lint', () => gulp
  .src(`${config.get('paths.css.src')}/**/*.scss`)
  .pipe(scssLint({
    config: `${__dirname}/.scss-lint.yml`,
    customReport: scssLintOutputReporter,
  })).on('error', handleError)
);
