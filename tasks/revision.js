import { isDevelopment } from "../lib/env";

import fs from "fs";
import log from "fancy-log";
import config from "../lib/config";
import pump from "pump";
import rev from "gulp-rev";
import revDeleteOriginal from "gulp-rev-delete-original";
import revRewrite from "gulp-rev-rewrite";
import { src, dest, task, parallel, series } from "gulp";

const MANIFEST_DIR =
  config.get("tasks.revision") &&
  config.get("tasks.revision.manifest.directory")
    ? config.get("tasks.revision.manifest.directory")
    : config.get("paths.dist");

const MANIFEST_FILE =
  config.get("tasks.revision") && config.get("tasks.revision.manifest.file")
    ? config.get("tasks.revision.manifest.file")
    : "assets.json";

const MANIFEST_FULL_PATH = `${MANIFEST_DIR}/${MANIFEST_FILE}`;

const DEFAULTS = [
  `${config.get("tasks.sass.dist")}/**/*.css`,
  `${config.get("tasks.javascript.dist")}/**/*.js`,
  `${config.get("tasks.images.dist")}/**/*.{gif,jpg,jpeg,svg,png}`,
];

/**
 * Add revision hash behind filename so we can cache assets forever.
 */
const hashFiles = (done) => {
  if (isDevelopment || !config.get("tasks.revision")) {
    log(`Skipping 'revision:hash' task for development`);
    return done();
  }
  return pump(
    [
      src([...DEFAULTS, ...(config.get("tasks.revision.files") || [])], {
        base: config.get("paths.dist"),
      }),
      rev(),
      revDeleteOriginal(),
      dest(config.get("paths.dist")),
      rev.manifest(MANIFEST_FILE),
      dest(MANIFEST_DIR),
    ],
    done
  );
};

/*
 * Replace image and font urls in CSS files.
 */
const replaceCss = (done) => {
  if (isDevelopment || !config.get("tasks.revision")) {
    log(`Skipping 'revision:css' task for development`);
    return done();
  }
  return pump(
    [
      src(`${config.get("tasks.sass.dist")}/**/*.css`),
      revRewrite({ manifest: fs.readFileSync(MANIFEST_FULL_PATH) }),
      dest(config.get("tasks.sass.dist")),
    ],
    done
  );
};

/**
 * Replace image and font urls in JavaScript files.
 */
const replaceJs = (done) => {
  if (isDevelopment || !config.get("tasks.revision")) {
    log(`Skipping 'revision:javascript' task for development`);
    return done();
  }
  return pump(
    [
      src(`${config.get("tasks.javascript.dist")}/**/*.js`),
      revRewrite({ manifest: fs.readFileSync(MANIFEST_FULL_PATH) }),
      dest(config.get("tasks.javascript.dist")),
    ],
    done
  );
};

/**
 * Revision tasks wrapper.
 */
export const revision = series(hashFiles, parallel(replaceCss, replaceJs));

task("revision:hash", hashFiles);
task("revision:css", replaceCss);
task("revision:javascript", replaceJs);
task("revision", revision);
