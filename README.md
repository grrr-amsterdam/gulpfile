# gulpfile
The best Gulpfile in the world, by Grrr - Creative Digital Agency in Amsterdam.

## How to use

- Create a folder for your new project or enter your existing project
- Install this package through npm: `npm install grrr-gulpfile --save-dev`
- Create a config file at a location like `config/default.json` (for the allowed config file locations, look at [npm package config](https://www.npmjs.com/package/config) )
- Run gulp by calling `gulp --cwd . --gulpfile 'node_modules/grrr-gulpfile/gulpfile.js'` (tip: save this as an npm script in your project's `package.json`)

## Config file

This is a good starting point for a config file:

```javascript
{
  "app": {
    "domain": "localhost",
    "port": 80
  },
  "paths": {
    "dist": "./dist",
    "src": "./src",
    "images": {
      "src": "./src/images/**/*.{png,gif,jpg}",
      "dist": "./dist/images"
    },
    "svg": {
      "src": "./src/svg/**/*.svg",
      "dist": "./dist/svg"
    },
    "js": {
      "src": "./src/js/**/*.js",
      "entries": "./src/js/main.js",
      "bundle": "bundle.js",
      "dist": "./dist/js"
    },
    "css": {
      "src": "./src/sass/**/*.scss",
      "dist": "./dist/css",
      "entry": "./src/sass/base.scss"
    },
    "copy": {
      "src": [
        "./src/favicon.ico",
        "./src/fonts/**/*",
        "./src/js/vendor/**/*"
      ]
    }
  }
}
```

## Tasks

Specify which tasks to run by calling gulp like: `gulp [task-name] --cwd . --gulpfile 'node_modules/grrr-gulpfile/gulpfile.js'`
Or if you have set it as an npm script: `npm run build -- [task-name]`

- `browsersync` Auto refresh and hot reloading in the browser
- `browserify` Bundle javascript modules required together into a single bundle.js.
- `clean` removes everything in the `config.paths.dist` folder
- `copy` copies files from the `config.paths.copy.src` to the `config.paths.dist`
- `default` runs `clean`, `copy`, `sass`, `sass:lint`, `browserify`, `images`, `svg`, `modernizr`, and `revision`
- `eslint`
- `images` runs imagemin on all images in the `config.paths.images.src` and saves the result to `config.paths.images.dist`
- `init` prints some debug info
- `modernizr` checks js and scss source files for Modernizr tests and creates a custom modernizr build
- `revision` creates a revisioned filename for each static asset
- `sass`
- `svg` creates a svg sprite
- `watch` runs the same tasks as `default` but will retrigger when files are changed

For more info, jump into the tasks folder.
