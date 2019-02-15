import { env } from '../lib/env';

import log from 'fancy-log';
import path from 'path';
import fs from 'fs';

const gulpfile = path.join(__dirname, '../package.json');
const { version } = JSON.parse(fs.readFileSync(gulpfile));

/**
 * Show the current package version and environment.
 */
export const init = done => {
  log('───────────────────────────────────');
  log(`Gulpfile: v${version}`);
  log(`Environment: ${env}`);
  log('───────────────────────────────────');
  done();
};
