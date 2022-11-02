# Changelog

This changelog only lists notable changes. Major version are always breaking, although in a few edge cases minor versions could be too. Both are listed here. Check individual releases (tags) and their commits to see unlisted changes.

### v9.0.1 (2022-01-02)

A fix was added since `gulp-eslint` is abandoned, and resulted in an ESLint config conflict. The default `.eslintrc` config now has been updated.

#### ESLint config

If your project is using a custom config, please add or update the following rules:

```json
{
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "requireConfigFile": false
  }
}
```

### v9.0.0 (2022-10-31)

All dependencies were updated, and the following breaking changes are introduced:

- The minimum Node.js version is now 14.18; all packages were tested with the latest LTS (Node.js 18).
- The `engines` restriction is removed from the `package.json`, allowing for easier future usage without actively updating this package.
- Stylelint was updated. Update your config if: your project uses a custom config (`.stylelintrc`), and your project is using a parsing language (e.g. Sass with SCSS syntax). See below for config adjustments.
- An [update to gulp-svgstore](https://github.com/w0rm/gulp-svgstore/releases/tag/9.0.0) will now transfer presentation attributes from original icons root to a wrapping group (`<svg>` to `<g>`). See below for instructions.

#### Stylelint config

If you're using a custom `.stylelintrc`, add following to your configuration (given that you're using Sass with SCSS syntax):

```json
"overrides": [
    {
      "files": ["*.scss", "**/*.scss"],
      "customSyntax": "postcss-scss"
    }
]
```

#### Icons task

If you're using the `icons` tasks to generate an icon SVG sheet, make sure to verify your icons.
Previously presentation attributes on the `<svg>` were dropped, now they're transferred to a wrapping `<g>`.

For example: if there's a `fill="none"` on the parent `<svg>`, this will now be copied, while previously one might've only removed them on `<path>`s. In this case it would render the icons transparent if a fill was set via CSS.

### v8.0.0 (2020-09-01)

-   We've moved away from `sass-lint` in favor of `stylelint`, since the former is no longer supported. Note that any `sass-lint:ignore` rules you might have used in current projects won't work anymore!
-   We've started to use [Prettier](https://prettier.io/) at GRRR. This means the default RC files for `eslint` and `stylelint` will extend from Prettier. If you don't want to use Prettier, you can create your own lint config files, they will be picked up in favor of the defaults.

### v7.0.0 (2020-02-14)

#### Require Node.js 10+

Due to an upgrade of `gulp-imagemin` to [v7.0.0](https://github.com/sindresorhus/gulp-imagemin/releases/tag/v7.0.0), this package now requires at least version 10 of Node.js.

### v6.5.3 (2019-03-28)

#### Remove default Modernizr.picture test

The `Modernizr.picture` test was removed from the defaults, allowing for a custom Modernizr task config if customization is needed.

To revert the removeal of the `Modernizr.picture` default, add the following task in `gulp.json`:

```js
"modernizr": {
  "options": [
    "addTest",
    "setClasses"
  ],
  "tests": [
    "picture"
  ]
}
```

### v6.4.0 (2019-02-28)

#### Replace Browserify by Rollup

Browserify was replaced by [Rollup](https://github.com/rollup/rollup), due to its focus on ESM instead of CommonJS.

Note: this might be a breaking change to some projects, since having both _ESM imports_ and _CommonJS requires_ in the same file is not allowed anymore. In this case some JavaScript files might have to be refactored.

This...

```js
require("./polyfills/array-from");
```

... becomes:

```js
import "./polyfills/array-from";
```

### v6.3.0 (2019-02-27)

#### Replace Uglify by Terser

Uglify was replaced by [Terser](https://github.com/terser-js/terser), since it supports ES6+ natively and `uglify-es` is no longer maintained.

### v6.2.0 (2019-02-15)

#### Re-add Uglify for main JavaScript

Uglify was re-added for the `javascript:build` task in non-development.

### v6.1.0 (2019-02-15)

#### Upgrade to Gulp v4

Gulp was upgraded to `v4.0.0` and the tasks were refactored accordingly.

### v6.0.0 (2018-12-15)

#### Replace Browsersync proxy configuration

The old way of specifying the Browsersync proxy is deprecated in favour of adding it via an environment variable (`BROWSERSYNC_PROXY`).

This...

```json
"app": {
  "domain": "localhost.<something>.com",
  "port": 443
},
```

... is replaced with an entry in a `.env` file:

```
BROWSERSYNC_PROXY=localhost.<something>.com
```

To load the `.env` from somewhere else than the root, specify it in the `gulp.json`:

```json
  "dotenv": {
    "file": "../../.env"
  },
```

### v5.0.0 (2018-10-23)

#### Move to namespaced package

The package is renamed from `grrr-gulpfile` to `@grrr/gulpfile`. Update all references in your `package.json` to `node_modules/@grrr/gulpfile/gulpfile.js`.

### v4.0.0 (2018-08-30)

#### Upgrade to Babel 7

Babel has deprecated some packages, and has a new naming structure. This means that host packages need to be updated. See the [migration guide](https://babeljs.io/docs/en/v7-migration).

This...

```json
"plugins": [
  "plugin-transform-object-rest-spread"
],
"presets": [
  [
    "preset-env", {}
  ]
]
```

... becomes:

```json
"plugins": [
  "@babel/plugin-proposal-object-rest-spread"
],
"presets": [
  [
    "@babel/preset-env", {}
  ]
]
```

### v3.0.0 (2017-10-10)

#### Split up JavaScript into ES6 (ES2015+) and legacy versions

There are two seperate Babel config entries, and two bundle output entries. This means you can have a `main.js` file for evergreen browsers, alongside a `main-legacy.js` file which will serve older browsers. Additionally really old browser can be served a `no-js` version of the website.

#### Removed JavaScript minification

Uglify doesn't work wel with ES6 syntax, and `gulp-uglify` gave errors when running with newer JavaScript syntax (eg. async functions). Since all files should be served with `gzip` (or some newer form of compression) anyhow, this shouldn't hurt much.
A future release might add something like [babel-minify](https://github.com/babel/minify).

### v2.0.0 (2017-10-08)

Changed the way paths are listed in the revisioned manifest JSON file:

```json
"main.js": "main-52d31ea9cb.js",
"base.css": "base-26102c538a.css"
```

now becomes:

```json
"scripts/modernizr.js": "scripts/modernizr-e8731e5942.js",
"styles/base.css": "styles/base-26102c538a.css"
```

### v1.0.0 (2017-08-01)

Initial release.

### v0.1.0 (2016-07-08)

Hello world.
