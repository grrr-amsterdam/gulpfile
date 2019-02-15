import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import config from './lib/config';

/**
 * Load environment variables from `.env`
 */
dotenv.config({ path: config.get('dotenv.file') || process.cwd() });

/**
 * Gulp tasks are defined in separate files in the tasks folder
 */
const taskFolder = path.join(__dirname, 'tasks');
fs.readdirSync(taskFolder)
  .filter(name => /(\.(js)$)/i.test(path.extname(name)))
  .forEach(task => require(path.join(taskFolder, task)));

/**
 * Custom `SIGINT` listener to exit process
 */
process.on('SIGINT', e => process.exit(1));
