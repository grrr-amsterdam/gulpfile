import config from "../lib/config";

import log from "fancy-log";
import fs from "fs";
import path from "path";
import gulpEsLint from "gulp-eslint-new";
import { src, task } from "gulp";

const ESLINT_FILE = ".eslintrc";
const ESLINT_CONFIG = fs.existsSync(ESLINT_FILE)
  ? ESLINT_FILE
  : path.join(__dirname, `../defaults/${ESLINT_FILE}`);

/**
 * Lint JavaScript files (see `.eslintrc`).
 */
export const eslint = (done) => {
  if (!config.get("tasks.javascript.src")) {
    log(`skipping 'eslint' task`);
    return done();
  }
  return src([
    config.get("tasks.javascript.src"),
    "!**/{vendor,polyfills}/**/*.js",
  ])
    .pipe(gulpEsLint(ESLINT_CONFIG))
    .pipe(gulpEsLint.format());
};

task("eslint", eslint);
