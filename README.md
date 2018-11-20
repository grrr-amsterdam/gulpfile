# Grrr Gulpfile
An opinionated and modular gulpfile.
Made with ❤️ by [Grrr](https://grrr.nl/), a digital creative agency in Amsterdam.

[![Build Status](https://travis-ci.com/grrr-amsterdam/gulpfile.svg?branch=master)](https://travis-ci.com/grrr-amsterdam/gulpfile)
[![Dependencies](https://david-dm.org/grrr-amsterdam/gulpfile.svg)](https://david-dm.org/grrr-amsterdam/gulpfile)

# Quick start
Basic installation and configuration is as follows:

### Install
Install this package in your project through yarn or npm:
```
npm install @grrr/gulpfile --save-dev
```

### Configure
1. Create a `gulp.json` config file (see [below](#task-configuration)).
2. Add the required Babel dependencies for your project. A good starting point is by adding `@babel/preset-env`.

```
npm install --save-dev @babel/preset-env
```

See the [Babel docs](https://babeljs.io/docs/plugins/preset-env/) for more information. Now specify the Babel config in the `gulp.json`. See [the advanced example](https://github.com/grrr-amsterdam/gulpfile/blob/master/examples/config-advanced.json#L35) for an example, or check the [Babel docs](https://babeljs.io/docs/usage/babelrc/) for more information.

### Run
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

- To build, run the build task: `npm run watch`
- To watch, run the watch task: `npm run watch`
- To build for a specific environment: `npm run build:production`
- To run a specific task: `npm run build images`

---

## Task configuration
Check the [examples](https://github.com/grrr-amsterdam/gulpfile/tree/master/examples) for a basic and advanced `gulp.json` config.

---

## Overriding defaults
The project uses a few sensible defaults for `Autoprefixer`, `sass-lint`, `eslint` (specs and ignores). These defaults can be overwritten:

- The Autoprefixer options used in `sass`. These can be specified in the `gulp.json` file in an `autoprefixer` object within the `sass` task.
- The rules used in `sass:lint`. Place a `.sass-lint.yml` file in your project.
- The `eslint` rules. Place an `.eslintrc` file in your project. You can additionally add an `.eslintignore` for ignoring (wildcarded) folders or packages specific to your project.

---

## Available tasks
Specify which tasks to run by calling gulp like: `gulp [task-name] --cwd . --gulpfile 'node_modules/@grrr/gulpfile/gulpfile.js'`. Or if speciefied `gulp` as a script: `yarn run gulp <task>`.

The individual tasks include:

- `browsersync` auto refresh and hot reloading in the browser
- `clean` removes all built assets
- `copy` copies files that don't need processing (like fonts, videos and the favicon)
- `eslint` lints js with opinionated rules, which can be overwritten by including your own `.eslintrc`
- `images` runs imagemin on all images in the `config.paths.images.src` and saves the result to `config.paths.images.dist`
- `javascript:build` bundles JavaScript into a single bunle thru Browserify and transpiles it via Babel
- `javascript:watch` watches for changes and builds the bundle when changes are detected
- `javascript:vendor` copies and uglifies vendor files (can also concatenate them)
- `init` prints some debug info
- `icons` creates a svg sprite
- `modernizr` checks js and scss source files for Modernizr tests and creates a custom Modernizr build
- `revision` creates a revisioned filename for each static asset
- `sass` compiles sass with globbing
- `sass:lint` lints sass with opinionated rules, which can be overwritten by including your own `.sass-lint.yml`

The main tasks are:

- `build` runs all above tasks, except `browsersync` (some tasks are dependent on the called environment)
- `watch` runs the same tasks as `default` but will retrigger when files are changed, and will start browsersync

For more info, jump into the tasks folder.

---

## Contributing
To make changes to this gulpfile, it's best to replace the installed package in a real project with a locally linked development version. This can be done with both yarn or npm. We use yarn in this example; for npm check the [npm docs](https://docs.npmjs.com/cli/link) . Inside the root of the repo, run:
```
yarn link
```
Inside the root of the project you want to test the gulpfile, run:
```
yarn link @grrr/gulpfile
```
When you're done, you can publish the changes on `npm` and unlink the development version by running the following inside the project:
```
yarn unlink @grrr/gulpfile
yarn install
```
