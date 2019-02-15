import config from '../lib/config';

import browserSyncPackage from 'browser-sync';
import { task } from 'gulp';

/**
 * Auto refresh and hot reloading in the browser.
 *
 * Also makes your development computer available to
 * third party devices over the network.
 */
export const browsersync = done => {
  browserSyncPackage({
    proxy: process.env.BROWSERSYNC_PROXY,
    open: false,
  });
  done();
};

task('browsersync', browsersync);
