import config from "../lib/config";

import log from "fancy-log";
import pump from "pump";
import { src, dest, task } from "gulp";

/**
 * Copy files from on location to the other.
 */
export const copy = (done) => {
  if (!config.get("tasks.copy")) {
    log(`Skipping 'copy' task`);
    return done();
  }
  return pump(
    [
      src(config.get("tasks.copy"), {
        base: config.get("paths.src"),
      }),
      dest(config.get("paths.dist")),
    ],
    done
  );
};

task("copy", copy);
