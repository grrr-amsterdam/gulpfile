# Grrr Gulpfile
An opinionated and modular gulpfile.
Made with ❤️ by [Grrr](https://grrr.nl/), a digital creative agency in Amsterdam.

[![Greenkeeper badge](https://badges.greenkeeper.io/grrr-amsterdam/gulpfile.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/grrr-amsterdam/gulpfile.svg)](https://travis-ci.org/grrr-amsterdam/gulpfile)
[![Dependencies](https://david-dm.org/grrr-amsterdam/gulpfile.svg)](https://david-dm.org/grrr-amsterdam/gulpfile)


## Quick start
Basic installation and configuration is as follows:

#### Install
Install this package in your project through yarn or npm:
```
npm install grrr-gulpfile --save-dev
```

#### Configure
- Create a `gulp.json` config file (see below).
- Add a `.babelrc` file and add the required dependencies for the project. A good starting point is by adding `babel-preset-env`, and adding it as the current preset in the `.babelrc` file. See the [Babel documentation](https://babeljs.io/docs/plugins/preset-env/) for more info.

Note: the `.babelrc` file in this project is only used for transpiling the gulpfile itself. Without one specified in the project, no transpiling or bundling of JavaScript will be performed.

#### Run
Run gulp by calling:
```
gulp --cwd . --gulpfile 'node_modules/grrr-gulpfile/gulpfile.babel.js'
```


Tip: save this as an npm script in your project's `package.json`, for example:
```json
"scripts": {
    "watch": "gulp watch --cwd . --gulpfile 'node_modules/grrr-gulpfile/gulpfile.js'",
    "build": "gulp --cwd . --gulpfile 'node_modules/grrr-gulpfile/gulpfile.js'",
    "build:staging": "gulp --staging --cwd . --gulpfile 'node_modules/grrr-gulpfile/gulpfile.js'",
    "build:production": "gulp --production --cwd . --gulpfile 'node_modules/grrr-gulpfile/gulpfile.js'"
},
```
Then run by calling the watch task:
```
npm run watch
```
or build for a specific environment:
```
npm run build:production
```
or run a specific task:
```
npm run build images
```

## Config file
Below is an example `gulp.json` config, check the [examples](https://github.com/grrr-amsterdam/gulpfile/tree/master/examples) for more advanced configs.

```javascript
{
  "app": {
    "domain": "localhost.<something>.com"
  },
  "paths": {
    "src": "./assets",
    "dist": "./dist"
  },
  "tasks": {
    "icons": {
      "src": "./assets/images/icons/**/*.svg",
      "dist": "./dist/images"
    },
    "images": {
      "src": "./assets/images/**/*.{png,gif,jpg,jpeg,svg}",
      "dist": "./dist/images"
    },
    "javascript": {
      "src": "./assets/scripts/**/*.js",
      "dist": "./dist/scripts",
      "main": "./assets/scripts/main.js",
      "bundle": "main.js"
    },
    "sass": {
      "src": "./assets/styles/**/*.scss",
      "dist": "./dist/styles",
      "main": "./assets/styles/base.scss"
    }
  }
}
```

## Overriding defaults
Some defaults can be overwritten. These are:

- The Autoprefixer options used in `sass`. These can be specified in the `gulp.json` file.
- The rules used in `sass:lint`. Place a `.sass-lint.yml` file in your project.
- The `eslint` rules. Place an `.eslintrc` file in your project.
- You can additionally add an `.eslintignore` for ignoring (wildcarded) folders or packages.

## Tasks
Specify which tasks to run by calling gulp like: `gulp [task-name] --cwd . --gulpfile 'node_modules/grrr-gulpfile/gulpfile.js'`. Or if speciefied `gulp` as a script: `yarn run gulp <task>`.

The individual tasks include:

- `browsersync` auto refresh and hot reloading in the browser
- `clean` removes all built assets
- `copy` copies files that don't need processing (like fonts, videos and the favicon)
- `eslint` lints js with opinionated rules, which can be overwritten by including your own `.eslintrc`
- `images` runs imagemin on all images in the `config.paths.images.src` and saves the result to `config.paths.images.dist`
- `javascript` bundles javascript into a single bunle thru Browserify and transpiles them via Babel (adding a project-specific `.babelrc` file + dependencies is required)
- `javascript:vendor` copies and uglifies vendor files (can also concatenate them)
- `init` prints some debug info
- `icons` creates a svg sprite
- `modernizr` checks js and scss source files for Modernizr tests and creates a custom Modernizr build
- `revision` creates a revisioned filename for each static asset
- `sass` compiles sass with globbing
- `sass:lint` lints sass with opinionated rules, which can be overwritten by including your own `.sass-lint.yml`

The main tasks are:

- `default` runs all above tasks, except `browsersync` (some tasks are dependent on the called environment)
- `watch` runs the same tasks as `default` but will retrigger when files are changed, and will start browsersync

For more info, jump into the tasks folder.

## Development
To make changes to this gulpfile, it's best to replace the installed package in a real project with a locally linked development version. This can be done with both yarn or npm. We use yarn in this example; for npm check the [npm docs](https://docs.npmjs.com/cli/link) . Inside the root of the `grrr-gulpfile` repo, run:
```
yarn link
```
Inside the root of the project you want to test the gulpfile, run:
```
yarn link grrr-gulpfile
```
When you're done, you can publish the changes on `npm` and unlink the development version by running the following inside the project:
```
yarn unlink grrr-gulpfile
yarn install
```
