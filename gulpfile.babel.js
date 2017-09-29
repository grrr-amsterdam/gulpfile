import fs from 'fs';
import path from 'path';

/**
 * Gulp tasks are defined in separate files in the tasks folder
 */
const taskFolder = path.join(__dirname, 'tasks');
fs.readdirSync(taskFolder)
  .filter((name) => /(\.(js)$)/i.test(path.extname(name)))
  .forEach((task) => require(path.join(taskFolder, task)));

/**
 * Custom `SIGINT` listener to exit process
 */
process.on('SIGINT', (e) => {
  process.exit();
});
