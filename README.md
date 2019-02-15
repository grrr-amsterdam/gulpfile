# Grrr Gulpfile
An opinionated and modular gulpfile.
Made with ❤️ by [Grrr](https://grrr.nl/), a digital creative agency in Amsterdam.

[![Build Status](https://travis-ci.com/grrr-amsterdam/gulpfile.svg?branch=master)](https://travis-ci.com/grrr-amsterdam/gulpfile)
[![Dependencies](https://david-dm.org/grrr-amsterdam/gulpfile.svg)](https://david-dm.org/grrr-amsterdam/gulpfile)

## Installation
Install this package in your project through yarn or npm:
```
npm install @grrr/gulpfile --save-dev
```

## Configuration
1. Create a `gulp.json` config file. Check the [examples](https://github.com/grrr-amsterdam/gulpfile/tree/master/examples) for all the available options.

2. When transpiling JavaScript, add the required Babel dependencies for your project.
    See the [Babel docs](https://babeljs.io/docs/plugins/preset-env/) for more information. A good starting point is by adding `@babel/preset-env`:

    ```
    npm install --save-dev @babel/preset-env
    ```

3. When using the watch task, create an environment variable called `BROWSERSYNC_PROXY` with your app domain (eg: `localhost:10000`). This will point Browsersync to your app. To do so, add a [.env file](https://github.com/grrr-amsterdam/gulpfile/tree/master/examples/.env.example) in the root of your project. You can also load it from another location by specifying it in the [gulp.json](https://github.com/grrr-amsterdam/gulpfile/tree/master/examples/config-advanced.json) config file.

## Usage
Run gulp by calling:
```
gulp --cwd . --gulpfile 'node_modules/@grrr/gulpfile/gulpfile.js'
```

Tip: save this as an npm script in your project's `package.json`, for example:
```json
"scripts": {
    "watch": "gulp watch --cwd . --gulpfile 'node_modules/@grrr/gulpfile/gulpfile.js'",
    "build": "gulp --cwd . --gulpfile 'node_modules/@grrr/gulpfile/gulpfile.js'",
    "build:staging": "gulp --staging --cwd . --gulpfile 'node_modules/@grrr/gulpfile/gulpfile.js'",
    "build:production": "BABEL_ENV=production gulp --production --cwd . --gulpfile 'node_modules/@grrr/gulpfile/gulpfile.js'"
},
```

- To build, run the build task: `npm run build`
- To watch, run the watch task: `npm run watch`
- To build for a specific environment: `npm run build:production`
- To run a specific task: `npm run build images`

## Tasks
The individual tasks are:

- `browsersync` — auto refresh and hot reloading in the browser
- `clean` — removes all built assets
- `copy` — copies files that don't need processing (like fonts, videos and the favicon)
- `eslint` — lints js with opinionated rules, which can be overwritten by including your own `.eslintrc`
- `images` — runs imagemin on all images in the `config.paths.images.src` and saves the result to `config.paths.images.dist`
- `javascript:build` — bundles JavaScript into a single bundle thru Browserify and transpiles it with Babel
- `javascript:watch` — watches for changes and builds the bundle when changes are detected
- `javascript:vendor` — copies and uglifies vendor files (can also concatenate them)
- `init` — prints some debug info
- `icons` — creates a svg sprite
- `modernizr` — checks js and scss source files for Modernizr tests and creates a custom Modernizr build
- `revision` — creates a revisioned filename for each static asset
- `sass` — compiles Sass with globbing and Autoprefixer
- `sass:lint` — lints Sass with opinionated rules, which can be overwritten by including your own `.sass-lint.yml`

The main tasks are:

- `build` runs all above tasks, except `browsersync` (some tasks are dependent on the called environment)
- `watch` runs the same tasks as `default` but will retrigger when files are changed, and will start Browsersync

For more info, jump into the tasks folder.

## Prefixer and linter defaults
The project uses a few sensible defaults for `Autoprefixer`, `Sass Lint` and `ESLint`. These defaults can be overwritten:

- Autoprefixer: used in `sass`. Can be specified in the `gulp.json` file in an `autoprefixer` object within the `sass` task.
- Sass Lint: used in `sass:lint`. Place a `.sass-lint.yml` file in the root of your project.
- ESLint: used in `eslint`. Place an `.eslintrc` file in the root of your project. You can additionally add an `.eslintignore` for ignoring (wildcarded) folders or packages specific to your project.

## Contributing
To make changes to this gulpfile, it's best to replace the installed package in a real project with a locally linked development version. To do so, run the following command in the repo of this project:
```
yarn link
```

Inside the root of the project you want to test `@grrr/gulpfile` in, run:
```
yarn link @grrr/gulpfile
```

When you're done, you can publish the changes and unlink the development version by running:
```
yarn unlink @grrr/gulpfile
yarn install
```

Note that when locally testing updated dependencies, it's better to use a tool like [Yalc](https://github.com/whitecolor/yalc). Dependency resolution in linked packages (via `yarn link`) does not work the same way as when the package would've been published.
