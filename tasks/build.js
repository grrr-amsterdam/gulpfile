import { parallel, series, task } from 'gulp';

import { clean } from './clean';
import { copy } from './copy';
import { eslint } from './eslint';
import { icons } from './icons';
import { images } from './images';
import { init } from './init';
import { jsbuild } from './javascript';
import { jsvendor } from './javascript-vendor';
import { modernizr } from './modernizr';
import { revision } from './revision';
import { sass } from './sass';
import { sasslint } from './sass-lint';

export const TASKS = series(
  init,
  clean,
  parallel(
    modernizr,
    jsvendor,
    sass,
    copy,
    images,
    icons,
  ),
  jsbuild,
  eslint,
  sasslint,
  revision,
);

task('build', TASKS);
task('default', TASKS);
