import config from "../lib/config";
import del from "del";
import { task } from "gulp";

/**
 * Clean the build folder.
 */
export const clean = (done) => {
  del([`${config.get("paths.dist")}/**/*`], { dot: true }).then((paths) =>
    done()
  );
};

task("clean", clean);
