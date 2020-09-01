import fs from "fs";
import path from "path";
import { memoize } from "./utils";

export const getParsedConfig = memoize(() => {
  const configFile = fs.readFileSync(path.resolve(process.cwd(), "gulp.json"));
  return JSON.parse(configFile);
});

export const getEntryByDotString = (object, entryString) => {
  // Convert indexes to properties, strip leading dot and create an array.
  const entries = entryString
    .replace(/\[(\w+)\]/g, ".$1")
    .replace(/^\./, "")
    .split(".");
  return entries.reduce((acc, entry) => {
    if (acc && entry in acc) {
      return acc[entry];
    }
    return undefined;
  }, object);
};

const config = {
  get(entryString) {
    return getEntryByDotString(getParsedConfig(), entryString);
  },
};

export default config;
