import config from "../lib/config";

import browserSyncPackage from "browser-sync";
import { task } from "gulp";

/**
 * Auto refresh and hot reloading in the browser.
 *
 * Also makes your development computer available to
 * third party devices over the network.
 */
export const browsersync = (done) => {
  if (config.get("tasks.watch.browsersync") === false) {
    return done();
  }
  browserSyncPackage({
    proxy: process.env.BROWSERSYNC_PROXY,
    open: false,
  });
  return done();
};

export const reload = (done) => {
  browserSyncPackage.reload();
  done();
};

task("browsersync", browsersync);
task("browsersync:reload", reload);
