import fs from 'fs';
import path from 'path';
import log from 'fancy-log';

let parsedConfig;

const getParsedConfig = () => {
  if (!parsedConfig) {
    const configFile = fs.readFileSync(path.resolve(process.cwd(), 'gulp.json'));
    parsedConfig = JSON.parse(configFile);
  }
  return parsedConfig;
};

const convertDotStringToObject = (o, s) => {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

const config = {
  get(entry) {
    return convertDotStringToObject(getParsedConfig(), entry);
  },
};

export default config;
