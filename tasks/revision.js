import config from 'config';
import gulp from 'gulp';
import filter from 'gulp-filter';
import rev from 'gulp-rev';
import revDeleteOriginal from 'gulp-rev-delete-original';
import revReplace from 'gulp-rev-replace';
import { ENV } from '../lib/getEnv';

const needsRevision = () => ENV !== 'development';

/**
 * Add revision hash behind filename so we can cache assets forever
 */
gulp.task('revision:rename', () => {
  if (!needsRevision) {
    return;
  }

  const cssFilter = filter('**/*.css', { restore: true });
  const jsFilter = filter('**/*.js', { restore: true });
  const imgFilter = filter('**/*.{png,gif,jpg,svg}', { restore: true });

  return gulp.src(`${config.get('paths.dist')}/**/*.*`)
    .pipe(rev())
    .pipe(revDeleteOriginal())
    .pipe(cssFilter)
    .pipe(gulp.dest(config.get('paths.dist')))
    .pipe(cssFilter.restore)
    .pipe(jsFilter)
    .pipe(gulp.dest(config.get('paths.dist')))
    .pipe(jsFilter.restore)
    .pipe(imgFilter)
    .pipe(gulp.dest(config.get('paths.dist')))
    .pipe(imgFilter.restore)
    .pipe(rev.manifest(`rev-manifest-${ENV}.json`))
    .pipe(gulp.dest(config.get('paths.dist')));
});

/*
 * Replace image and font urls in css files
 */

gulp.task('revision', ['revision:rename'], () => {
  if (!needsRevision) {
    return;
  }

  const manifestFile = `${config.get('paths.dist')}/rev-manifest-${ENV}.json`;
  const manifest = gulp.src(manifestFile);

  return gulp.src(`${config.get('paths.css.dist')}/**/*.css`)
    .pipe(revReplace({ manifest }))
    .pipe(gulp.dest(config.get('paths.css.dist')));
});
