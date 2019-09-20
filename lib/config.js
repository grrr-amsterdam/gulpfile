import fs from 'fs';
import path from 'path';

let parsedConfig;

export const getParsedConfig = () => {
  if (!parsedConfig) {
    const configFile = fs.readFileSync(path.resolve(process.cwd(), 'gulp.json'));
    parsedConfig = JSON.parse(configFile);
  }
  return parsedConfig;
};

export const getEntryByDotString = (object, entryString) => {
  // Convert indexes to properties, strip leading dot and create an array.
  const entries = entryString.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');
  const match = entries.reduce((acc, entry) => {
    if (acc && entry in acc) {
      return acc[entry];
    }
    return acc;
  }, object);
  return match === object
    ? undefined
    : match;
};

const config = {
  get(entryString) {
    return getEntryByDotString(getParsedConfig(), entryString);
  },
};

export default config;
