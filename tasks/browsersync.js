import config from '../lib/config';
import gulp from 'gulp';

import browserSync from 'browser-sync';

const domain = config.get('app.domain');
const port = config.has('app.port') ? config.get('app.port') : null;
const proxy = domain && port ? `${domain}:${port}` : domain;

/**
 * Auto refresh and hot reloading in the browser
 *
 * Also makes your development computer available to
 * third party devices over the network.
 */
gulp.task('browsersync', () => {
  browserSync({
    proxy: domain ? domain : false,
    open: false,
  });
});
