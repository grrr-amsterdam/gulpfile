import config from "../lib/config";
import { isDevelopment } from "../lib/env";

import log from "fancy-log";
import fs from "fs";
import path from "path";
import gulpStyleLint from "gulp-stylelint";
import { src, task } from "gulp";

const LINT_FILE = ".stylelintrc";
const LINT_CONFIG = fs.existsSync(LINT_FILE)
  ? LINT_FILE
  : path.join(__dirname, `../defaults/${LINT_FILE}`);

/**
 * Lints sass (see `.stylelintrc`)
 */
export const stylelint = (done) => {
  if (!config.get("tasks.sass")) {
    log(`Skipping 'stylelint' task`);
    return done();
  }
  if (!isDevelopment) {
    log(`Skipping 'stylelint' task for non-development`);
    return done();
  }
  return src(config.get("tasks.sass.src")).pipe(
    gulpStyleLint({
      configFile: LINT_CONFIG,
      failAfterError: false,
      reporters: [
        {
          formatter: "string",
          console: true,
        },
      ],
    }),
  );
};

task("stylelint", stylelint);
