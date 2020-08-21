import config from '../lib/config';

import { task, watch, parallel, series } from 'gulp';

import { browsersync } from './browsersync';
import { eslint } from './eslint';
import { copy } from './copy';
import { icons } from './icons';
import { images } from './images';
import { jswatch } from './javascript';
import { sass } from './sass';
import { styleLint } from './style-lint';
import { TASKS } from './build';

const getGlobs = entry => config.get(entry) ? config.get(entry) : [];

/**
 * Watch for file changes and run Gulp tasks accordingly.
 */
const watchers = done => {
  watch(getGlobs('tasks.sass.src'), series(sass, styleLint));
  watch(getGlobs('tasks.images.src'), images);
  watch(getGlobs('tasks.icons.src'), icons);
  watch(getGlobs('tasks.copy'), copy);
  watch(getGlobs('tasks.javascript.src'), series(jswatch, eslint));
  watch(getGlobs('tasks.watch.files'), task('browsersync:reload'));
  done();
};

task('watch', parallel(
  browsersync,
  TASKS,
  watchers,
));
