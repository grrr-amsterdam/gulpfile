import config from '../lib/config';

import gulp from 'gulp';
import browserSync from 'browser-sync';

/**
 * Auto refresh and hot reloading in the browser
 *
 * Also makes your development computer available to
 * third party devices over the network.
 */
gulp.task('browsersync', () => {
  browserSync({
    proxy: process.env.BROWSERSYNC_PROXY,
    open: false,
  });
});
