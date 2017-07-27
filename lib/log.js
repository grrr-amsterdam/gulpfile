import util from 'gulp-util';

export const log = (value) => util.log(util.colors.green(value));
export const logError = (value) => util.log(util.colors.red(value));
