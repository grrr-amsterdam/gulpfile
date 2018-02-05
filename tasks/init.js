import { env } from '../lib/env';

import log from 'fancy-log';
import gulp from 'gulp';
import path from 'path';
import fs from 'fs';

const gulpfile = path.join(__dirname, '../package.json');
const gulpfilePackage = JSON.parse(fs.readFileSync(gulpfile));

/**
 * Shows a friendly message and does nothing else
 */
gulp.task('init', () => {
  log('───────────────────────────────────');
  log(`Gulpfile: v${gulpfilePackage.version}`);
  log(`Environment: ${env}`);
  log('───────────────────────────────────');
});
