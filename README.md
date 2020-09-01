# Gulpfile

[![Build Status](https://travis-ci.com/grrr-amsterdam/gulpfile.svg?branch=master)](https://travis-ci.com/grrr-amsterdam/gulpfile)
[![Dependencies](https://david-dm.org/grrr-amsterdam/gulpfile.svg)](https://david-dm.org/grrr-amsterdam/gulpfile)

An opinionated and modular gulpfile.
Made with ❤️ by [GRRR](https://grrr.nl/), a digital creative agency in Amsterdam.

## Installation

Install this package in your project through yarn or npm:

```sh
$ npm install @grrr/gulpfile --save-dev
```

## Configuration

1. Create a `gulp.json` config file ([examples](https://github.com/grrr-amsterdam/gulpfile/tree/master/examples)).

2. When transpiling JavaScript, add the required Babel dependencies for your project.
   See the [Babel docs](https://babeljs.io/docs/plugins/preset-env/) for more information. A good starting point is by adding `@babel/preset-env`:

    ```sh
    $ npm install --save-dev @babel/preset-env
    ```

3. When using the watch task, create an environment variable called `BROWSERSYNC_PROXY` with your app domain (eg: `localhost:10000`). This will point Browsersync to your app. To do so, add a [.env file](https://github.com/grrr-amsterdam/gulpfile/tree/master/examples/.env.example) in the root of your project. You can also load it from another location by specifying it in the [gulp.json](https://github.com/grrr-amsterdam/gulpfile/tree/master/examples/config-advanced.json) config file.

## Usage

Run gulp by calling:

```sh
$ gulp --cwd . --gulpfile 'node_modules/@grrr/gulpfile/gulpfile.js'
```

You can also add shortcuts as npm scripts, and run them like so:

```sh
$ npm run build # run build task
$ npm run watch # run watch task
$ npm run build:production # run build for environment
$ npm run build images # run specific task
```

To do so, add these to the `scripts` entry in your `package.json`.

```json
"scripts": {
  "watch": "gulp watch --cwd . --gulpfile 'node_modules/@grrr/gulpfile/gulpfile.js'",
  "build": "gulp --cwd . --gulpfile 'node_modules/@grrr/gulpfile/gulpfile.js'",
  "build:staging": "gulp --staging --cwd . --gulpfile 'node_modules/@grrr/gulpfile/gulpfile.js'",
  "build:production": "gulp --production --cwd . --gulpfile 'node_modules/@grrr/gulpfile/gulpfile.js'"
},
```

## Available tasks

The individual tasks are:

-   `browsersync` — auto refresh and hot reloading in the browser
-   `clean` — removes all built assets
-   `copy` — copies files that don't need processing (like fonts, videos and the favicon)
-   `eslint` — lints js with opinionated rules, based on [Prettier](https://prettier.io/), which can be overwritten by including your own `.eslintrc`
-   `images` — runs imagemin on all images in the `config.paths.images.src` and saves the result to `config.paths.images.dist`
-   `javascript:build` — bundles JavaScript into a single bundle with Rollup and transpiles it with Babel
-   `javascript:watch` — watches for changes and builds the bundle when changes are detected
-   `javascript:vendor` — copies and uglifies vendor files (can also concatenate them)
-   `init` — prints some debug info
-   `icons` — creates a svg sprite
-   `modernizr` — checks js and scss source files for Modernizr tests and creates a custom Modernizr build
-   `revision` — creates a revisioned filename for each static asset
-   `sass` — compiles Sass with globbing and Autoprefixer
-   `style:lint` — lints styles with opinionated rules, which can be overwritten by including your own `.stylelintrc`

The main tasks are:

-   `build` runs all above tasks, except `browsersync` (some tasks are dependent on the called environment)
-   `watch` runs the same tasks as `default` but will retrigger when files are changed, and will start Browsersync

For more info, take a look into the [tasks folder](https://github.com/grrr-amsterdam/gulpfile/tree/readme-update/tasks).

## Prefixer & linter defaults

The project uses a few sensible defaults for prefixers and linters. They can all be overwritten.

#### Autoprefixer

Used in `sass` task. Can be specified in the `gulp.json` file in an `autoprefixer` object within the `sass` task.

#### Style Lint

Used in `style:lint` tasks. Place a `.stylelintrc` file in the root of your project.

#### ESLint

Used in `eslint` tasks. Place an `.eslintrc` file in the root of your project. You can additionally add an `.eslintignore` for ignoring (wildcarded) folders or packages specific to your project.

## Contributing

To make changes to this gulpfile, it's best to replace the installed package in a real project with a locally linked development version. To do so, run the following command in the repo of this project:

```sh
$ yarn link
```

Inside the root of the project you want to test `@grrr/gulpfile` in, run:

```sh
$ yarn link @grrr/gulpfile
```

If you're testing a Node version which doesn't match the current `engines` restriction, installing or rebuilding won't work. You can circumvent that restriction via:

```sh
yarn --force --ignore-engines
```

When you're done, you can publish the changes and unlink the development version by running:

```sh
$ yarn unlink @grrr/gulpfile
$ yarn install
```

Note that when locally testing updated dependencies, it's better to use a tool like [Yalc](https://github.com/whitecolor/yalc). Dependency resolution in linked packages (via `yarn link`) does not work the same way as when the package would've been published.
