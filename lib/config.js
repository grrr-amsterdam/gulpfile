import fs from 'fs';
import path from 'path';

let parsedConfig;

const getParsedConfig = () => {
  if (!parsedConfig) {
    const configFile = fs.readFileSync(path.resolve(process.cwd(), 'gulp.json'));
    parsedConfig = JSON.parse(configFile);
  }
  return parsedConfig;
};

const convertDotStringToObject = (object, entryString) => {
  // Convert indexes to properties, strip leading dot and create an array.
  const entries = entryString.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');
  return entries.reduce((acc, entry) => {
    if (acc && entry in acc) {
      return acc[entry];
    }
    return acc;
  }, object);
};

const config = {
  get(entryString) {
    return convertDotStringToObject(getParsedConfig(), entryString);
  },
};

export default config;
