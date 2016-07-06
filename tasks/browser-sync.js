import config from 'config';
import gulp from 'gulp';
import { ENV } from '../lib/getEnv';
import browserSync from 'browser-sync';
import handleError from '../lib/handleError';

/**
 * Auto refresh and hot reloading in the browser
 *
 * Also makes your development computer available to
 * third party devices over the network.
 */
gulp.task('browser-sync', () => {
  let domain = config.get('app.domain');
  if (!domain) {
    handleError(`Could not get "${ENV}" domain from config`);
  }
  const port = config.get('app.port');
  if (port) {
    domain = `${domain}:${port}`;
  }
  browserSync({
    proxy: domain,
    open: false,
    notify: {
      styles: [
        'display: none',
        'padding: 15px',
        'font-family: sans-serif',
        'position: fixed',
        'font-size: 0.9em',
        'z-index: 9999',
        'right: 0px',
        'bottom: 0px',
        'border-top-left-radius: 5px',
        'background-color: rgb(27, 32, 50)',
        'margin: 0',
        'color: white',
        'text-align: center',
      ],
    },
  });
});
