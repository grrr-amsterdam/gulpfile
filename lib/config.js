import fs from 'fs';

const configFile = JSON.parse(fs.readFileSync('gulp.json'));

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
    return convertDotStringToObject(configFile, entry);
  }
};

export default config;
