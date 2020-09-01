/* eslint-disable import/no-dynamic-require,global-require */

import fs from "fs";
import path from "path";
import log from "fancy-log";
import dotenv from "dotenv";
import config from "./lib/config";

/**
 * Update `cwd` if `package.json` is a symlink.
 */
const packageLocation = fs.realpathSync(
  path.resolve(process.cwd(), "package.json")
);
const realPath = path.dirname(packageLocation);
if (process.cwd() !== realPath) {
  try {
    process.chdir(realPath);
  } catch (error) {
    log.error(`Unable to switch to symbolic directory: ${error}`);
    process.exit(1);
  }
}

/**
 * Load environment variables from `.env`.
 */
dotenv.config({ path: config.get("dotenv.file") || `${process.cwd()}/.env` });

/**
 * Gulp tasks are defined in separate files in the tasks folder.
 */
const taskFolder = path.join(__dirname, "tasks");
fs.readdirSync(taskFolder)
  .filter((name) => /(\.(js)$)/i.test(path.extname(name)))
  .forEach((task) => require(path.join(taskFolder, task)));

/**
 * Custom `SIGINT` listener to exit process.
 */
process.on("SIGINT", (e) => process.exit(1));
