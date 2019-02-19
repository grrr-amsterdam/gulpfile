import config from '../lib/config';

import browserSyncPackage from 'browser-sync';
import { task, watch, parallel, series } from 'gulp';

import { browsersync } from './browsersync';
import { eslint } from './eslint';
import { icons } from './icons';
import { images } from './images';
import { jswatch } from './javascript';
import { sass } from './sass';
import { sasslint } from './sass-lint';
import { TASKS } from './build';

const getGlobs = entry => config.get(entry) ? config.get(entry) : [];

/**
 * Watch for file changes and run Gulp tasks accordingly.
 */
const watchers = done => {
  watch(getGlobs('tasks.sass.src'), series(sass, sasslint));
  watch(getGlobs('tasks.images.src'), images);
  watch(getGlobs('tasks.icons.src'), icons);
  watch(getGlobs('tasks.javascript.src'), series(jswatch, eslint));
  watch(getGlobs('tasks.watch.files'), task('browsersync:reload'));
  done();
};

task('watch', parallel(
  browsersync,
  TASKS,
  watchers,
));
