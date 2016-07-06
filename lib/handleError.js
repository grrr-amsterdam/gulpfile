import util from 'gulp-util';

export default function (error, emitEnd) {
  util.beep();
  util.log(
    util.colors.white.bgRed('Error!'),
    util.colors.red(error.toString())
  );
  if (emitEnd || typeof(emitEnd) === 'undefined') {
    this.emit('end');
  }
}
